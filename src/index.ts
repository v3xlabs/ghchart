import { createLogger } from '@lvksh/logger';
import { config } from 'dotenv';
import Express from 'express';
import kleur from 'kleur';
import NodeCache from 'node-cache';

import { getGithubContributions } from './graphql';

config();

const log = createLogger(
    {
        info: kleur.cyan('INFO'),
        cache: kleur.red('CACHE'),
        setup: kleur.gray('SETUP'),
    },
    {}
);

const cache = new NodeCache({ stdTTL: 60 * 5 });

const app = Express();

(() => {
    const token = process.env.GH_TOKEN || '';
    const username = process.env.GH_USERNAME || '';

    if (!token) {
        log.setup('Missing GH_TOKEN from environment.');

        return;
    }

    if (!username) {
        log.setup('Missing GH_USERNAME from environment.');

        return;
    }

    app.get('/', async (request, response) => {
        const maybeCached = cache.get('ghchart-' + username);

        if (maybeCached) {
            log.cache('Returning cached value');
            response.json(maybeCached);

            return;
        }

        log.info('Querying GH at ' + new Date().toISOString());
        const a = await getGithubContributions({
            username,
            token,
        });

        log.cache('Setting cache');
        cache.set(
            'ghchart-' + username,
            a.data.data.user.contributionsCollection.contributionCalendar
        );

        response.json(
            a.data.data.user.contributionsCollection.contributionCalendar
        );
    });

    app.listen(1234, () => {
        log.info('Ready to go');
    });
})();
