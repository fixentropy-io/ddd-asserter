import { describe } from 'bun:test';
import { ruleFailed, rulePassed } from '../../test_utils';

describe('Bundled Command', () => {
    const BUNDLED_COMMAND_FOLDER = './ddd/bundled-commands-rules/';
    const BUNDLED_COMMANDS_ALLOWED_DEPENDENCIES_RULE = 'bundled-commands-allowed-dependencies';

    describe('can only depend on commands', () => {
        rulePassed(
            `${BUNDLED_COMMAND_FOLDER}${BUNDLED_COMMANDS_ALLOWED_DEPENDENCIES_RULE}-rule/rule-passed.json`,
            BUNDLED_COMMANDS_ALLOWED_DEPENDENCIES_RULE
        );
        ruleFailed(
            `${BUNDLED_COMMAND_FOLDER}${BUNDLED_COMMANDS_ALLOWED_DEPENDENCIES_RULE}-rule/rule-failed.json`,
            BUNDLED_COMMANDS_ALLOWED_DEPENDENCIES_RULE
        );
    });
});
