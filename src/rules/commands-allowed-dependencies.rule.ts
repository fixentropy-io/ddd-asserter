/**
 * **commands-allowed-dependencies :**
 * Commands can only have dependencies of type "ddd/aggregate"
 *
 * ## Examples
 *
 * Example of incorrect dragees for this rule:
 *
 * ```json
 * {
 *    "dragees": [
 *        {
 *            "name": "AnEvent",
 *            "profile": "ddd/event"
 *        },
 *        {
 *            "name": "ACommand",
 *            "profile": "ddd/command",
 *            "depends_on": {
 *                "AnEvent": ["field"]
 *            }
 *        }
 *    ],
 *    "result": {
 *        "pass": false,
 *        "errors": [
 *            {
 *                "drageeName": "ACommand",
 *                "message": "This command must only have a dependency of type \"ddd/value_object\"",
 *                "ruleId": "ddd/commands-allowed-dependencies"
 *            }
 *        ]
 *    }
 *}
 * ```
 * Example of correct dragees for this rule:
 *
 * ```json
 * {
 *     "dragees": [
 *         {
 *             "name": "AValueObject",
 *             "profile": "ddd/value_object"
 *         },
 *         {
 *             "name": "AnotherValueObject",
 *             "profile": "ddd/value_object"
 *         },
 *         {
 *             "name": "ACommand",
 *             "profile": "ddd/command",
 *             "depends_on": {
 *                 "AValueObject": ["field"],
 *                 "AnotherValueObject": ["field"]
 *             }
 *         }
 *     ],
 *     "result": {
 *         "pass": true
 *     }
 * }
 * ```
 *
 * @module Commands Allowed Dependencies
 *
 */
import {
    type RuleResult,
    RuleSeverity,
    directDependencies,
    expectDragee
} from '@dragee-io/type/asserter';
import type { Dragee, DrageeDependency } from '@dragee-io/type/common';
import { commandProfile, profileOf, profiles, valueObjectProfile } from '../ddd.model.ts';

const assertDrageeDependency = ({ root, dependencies }: DrageeDependency): RuleResult[] =>
    dependencies.map(dependency =>
        expectDragee(
            root,
            dependency,
            `This command must only have a dependency of type "${valueObjectProfile}"`,
            dragee => profileOf(dragee, valueObjectProfile)
        )
    );

export default {
    label: 'Commands Allowed Dependencies',
    severity: RuleSeverity.ERROR,
    handler: (dragees: Dragee[]): RuleResult[] =>
        profiles[commandProfile]
            .findIn(dragees)
            .map(command => directDependencies(command, dragees))
            .filter(dep => dep.dependencies)
            .flatMap(dep => assertDrageeDependency(dep))
};
