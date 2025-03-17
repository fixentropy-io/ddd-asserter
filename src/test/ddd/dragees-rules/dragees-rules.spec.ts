import { describe } from 'bun:test';
import { rulePassed, ruleFailed } from '../../test_utils';

describe('Entity Rules', () => {
    const DRAGEE_FOLDER = './ddd/dragees-rules/';
    const DRAGEE_ALLOWED_DEPENDENCIES_RULE = 'dragees-allowed-self-dependency';

    describe('A dragee can depend on itself', () => {
        // rulePassed(
        //     `${DRAGEE_FOLDER}${DRAGEE_ALLOWED_DEPENDENCIES_RULE}-rule/rule-passed.json`,
        //     DRAGEE_ALLOWED_DEPENDENCIES_RULE
        // );
        // rulePassed(
        //     `${DRAGEE_FOLDER}${DRAGEE_ALLOWED_DEPENDENCIES_RULE}-rule/rule-silently-passed.json`,
        //     DRAGEE_ALLOWED_DEPENDENCIES_RULE
        // );
        rulePassed(
            `${DRAGEE_FOLDER}${DRAGEE_ALLOWED_DEPENDENCIES_RULE}-rule/rule-silently-passed-2.json`,
            DRAGEE_ALLOWED_DEPENDENCIES_RULE
        );
    });
});
