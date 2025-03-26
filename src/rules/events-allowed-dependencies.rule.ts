/**
 * **events-allowed-dependencies :**
 * Events can only have dependencies of types "ddd/value_object"
 *
 * ## Examples
 *
 * Example of incorrect dragees for this rule:
 *
 * ```json
 * {
 *    "dragees": [
 *        {
 *            "name": "AnEntity",
 *            "profile": "ddd/entity"
 *        },
 *        {
 *            "name": "AnEvent",
 *            "profile": "ddd/event",
 *            "depends_on": {
 *                "AnEntity": ["field"]
 *            }
 *        }
 *    ],
 *    "result": {
 *        "pass": false,
 *        "errors": [
 *            {
 *                "drageeName": "AnEvent",
 *                "message": "This event must not have any dependency other than \"ddd/value_object\"",
 *                "ruleId": "ddd/events-allowed-dependencies"
 *            }
 *        ]
 *    }
 * }
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
 *             "name": "AnEvent",
 *             "profile": "ddd/event",
 *             "depends_on": {
 *                 "AValueObject": ["field"]
 *             }
 *         }
 *     ],
 *     "result": {
 *         "pass": true
 *     }
 * }
 * ```
 *
 * @module Events Allowed Dependencies
 *
 */
import {
    type RuleResult,
    RuleSeverity,
    directDependencies,
    expectDragee
} from '@dragee-io/type/asserter';
import type { Dragee, DrageeDependency } from '@dragee-io/type/common';
import {
    aggregateProfile,
    eventProfile,
    profileOf,
    profiles,
    valueObjectProfile
} from '../ddd.model.ts';

const assertDrageeDependency = ({ root, dependencies }: DrageeDependency): RuleResult[] =>
    dependencies.map(dependency =>
        expectDragee(
            root,
            dependency,
            `This event must not have any dependency other than "${valueObjectProfile}"`,
            dragee => profileOf(dragee, valueObjectProfile)
        )
    );

export default {
    label: 'Events Allowed Dependencies',
    severity: RuleSeverity.ERROR,
    handler: (dragees: Dragee[]): RuleResult[] =>
        profiles[eventProfile]
            .findIn(dragees)
            .map(event => directDependencies(event, dragees))
            .filter(dep => dep.dependencies)
            .flatMap(dep => assertDrageeDependency(dep))
};
