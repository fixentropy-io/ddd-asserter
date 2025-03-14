import { describe } from "bun:test";
import { ruleFailed, rulePassed } from "../../test_utils";

describe("Entity Rules", () => {
  const ENTITY_FOLDER = "./ddd/entities-rules/";
  const ENTITY_ALLOWED_DEPENDENCIES_RULE = "entities-allowed-dependencies";

  // Entité ne dépend que de commandes, d'évènements et de value objects
  describe("An entity can only depend on commands, events and value objects", () => {
    rulePassed(
      `${ENTITY_FOLDER}${ENTITY_ALLOWED_DEPENDENCIES_RULE}-rule/rule-passed.json`,
      ENTITY_ALLOWED_DEPENDENCIES_RULE
    );
    ruleFailed(
      `${ENTITY_FOLDER}${ENTITY_ALLOWED_DEPENDENCIES_RULE}-rule/rule-failed.json`,
      ENTITY_ALLOWED_DEPENDENCIES_RULE
    );
  });
});
