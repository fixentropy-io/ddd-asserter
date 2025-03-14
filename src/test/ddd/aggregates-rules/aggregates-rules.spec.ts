import { describe } from "bun:test";
import { ruleFailed, rulePassed } from "../../test_utils";

describe("Aggregate Rules", () => {
  const AGGREGATE_FOLDER = "./ddd/aggregates-rules/";
  const AGGREGATE_ALLOWED_DEPENDENCIES_RULE = "aggregates-allowed-dependencies";
  const AGGREGATE_MANDATORY_DEPENDENCIES_RULE =
    "aggregates-mandatory-dependencies";

  describe("An aggregate must contain only value objects, entities, or events", () => {
    rulePassed(
      `${AGGREGATE_FOLDER}${AGGREGATE_ALLOWED_DEPENDENCIES_RULE}-rule/rule-passed.json`,
      AGGREGATE_ALLOWED_DEPENDENCIES_RULE
    );
    ruleFailed(
      `${AGGREGATE_FOLDER}${AGGREGATE_ALLOWED_DEPENDENCIES_RULE}-rule/rule-failed.json`,
      AGGREGATE_ALLOWED_DEPENDENCIES_RULE
    );
  });

  describe("An aggregate must at least contains one entity", () => {
    rulePassed(
      `${AGGREGATE_FOLDER}${AGGREGATE_MANDATORY_DEPENDENCIES_RULE}-rule/rule-passed.json`,
      AGGREGATE_MANDATORY_DEPENDENCIES_RULE
    );
    ruleFailed(
      `${AGGREGATE_FOLDER}${AGGREGATE_MANDATORY_DEPENDENCIES_RULE}-rule/rule-failed.json`,
      AGGREGATE_MANDATORY_DEPENDENCIES_RULE
    );
  });
});
