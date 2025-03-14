import { describe } from 'bun:test';
import { ruleFailed, rulePassed } from '../../test_utils';

describe('Events rules', () => {
    const EVENTS_FOLDER = './ddd/events-rules/';
    const EVENTS_ALLOWED_DEPENDENCIES_RULE = 'events-allowed-dependencies';
    describe('can only depend on value objects', () => {
        ruleFailed(
            `${EVENTS_FOLDER}${EVENTS_ALLOWED_DEPENDENCIES_RULE}-rule/rule-failed.json`,
            EVENTS_ALLOWED_DEPENDENCIES_RULE
        );
        rulePassed(
            `${EVENTS_FOLDER}${EVENTS_ALLOWED_DEPENDENCIES_RULE}-rule/rule-passed.json`,
            EVENTS_ALLOWED_DEPENDENCIES_RULE
        );
    });
});
