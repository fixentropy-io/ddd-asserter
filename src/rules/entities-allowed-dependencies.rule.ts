/**
 * **entitys-allowed-dependencies :**
 * Entitys can only have dependencies of types "ddd/value_object", "ddd/entity" and "ddd/event"
 *
 * ## Examples
 *
 * Example of incorrect dragees for this rule:
 *
 * ```json
 *
 * {
 *    "dragees": [
 *        {
 *            "name": "AnAggregate",
 *            "profile": "ddd/aggregate"
 *        },
 *        {
 *            "name": "AnEntity",
 *            "profile": "ddd/entity",
 *            "depends_on": {
 *                "AnAggregate": ["field"]
 *            }
 *        }
 *    ],
 *    "result": {
 *        "pass": false,
 *        "errors": [
 *            {
 *                "drageeName": "AnEntity",
 *                "message": "This entity must not have any dependency other than of types ddd/command, ddd/event or ddd/value_object",
 *                "ruleId": "ddd/entities-allowed-dependencies"
 *            }
 *        ]
 *    }
 *}
 * ```
 * Example of correct dragees for this rule:
 *
 * ```json
 * {
 *    "dragees": [
 *        {
 *            "name": "AnEvent",
 *            "profile": "ddd/event"
 *        },
 *        {
 *            "name": "AValueObject",
 *            "profile": "ddd/value_object"
 *        },
 *        {
 *            "name": "ACommand",
 *            "profile": "ddd/command"
 *        },
 *        {
 *            "name": "AnEntity",
 *            "profile": "ddd/entity",
 *            "depends_on": {
 *                "AnEvent": ["field"],
 *                "AValueObject": ["field"],
 *                "ACommand": ["field"]
 *            }
 *        }
 *    ],
 *    "result": {
 *        "pass": true
 *    }
 *}
 * ```
 *
 * @module Entities Allowed Dependencies
 *
 */
import {
  type RuleResult,
  RuleSeverity,
  directDependencies,
  expectDragee,
} from "@dragee-io/type/asserter";
import type { Dragee, DrageeDependency } from "@dragee-io/type/common";
import {
  commandProfile,
  entityProfile,
  eventProfile,
  profileOf,
  profiles,
  valueObjectProfile,
} from "../ddd.model.ts";

const assertDrageeDependency = ({
  root,
  dependencies,
}: DrageeDependency): RuleResult[] =>
  dependencies.map((dependency) =>
    expectDragee(
      root,
      dependency,
      `This entity must not have any dependency other than of types ${commandProfile}, ${eventProfile} or ${valueObjectProfile}`,
      (dragee) =>
        profileOf(dragee, valueObjectProfile, commandProfile, eventProfile)
    )
  );

export default {
  label: "Entities Allowed Dependencies",
  severity: RuleSeverity.ERROR,
  handler: (dragees: Dragee[]): RuleResult[] =>
    profiles[entityProfile]
      .findIn(dragees)
      .map((entity) => directDependencies(entity, dragees))
      .filter((dep) => dep.dependencies)
      .flatMap((dep) => assertDrageeDependency(dep)),
};
