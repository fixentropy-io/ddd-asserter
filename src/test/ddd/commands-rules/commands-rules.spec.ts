import { describe } from "bun:test";
import { ruleFailed, rulePassed } from "../../test_utils";

describe("Command", () => {
  const COMMAND_FOLDER = "./ddd/commands-rules/";
  const COMMANDS_ALLOWED_DEPENDENCIES_RULE = "commands-allowed-dependencies";

  describe("can only depend on value objects", () => {
    rulePassed(
      `${COMMAND_FOLDER}${COMMANDS_ALLOWED_DEPENDENCIES_RULE}-rule/rule-passed.json`,
      COMMANDS_ALLOWED_DEPENDENCIES_RULE
    );
    ruleFailed(
      `${COMMAND_FOLDER}${COMMANDS_ALLOWED_DEPENDENCIES_RULE}-rule/rule-failed.json`,
      COMMANDS_ALLOWED_DEPENDENCIES_RULE
    );
  });
});
