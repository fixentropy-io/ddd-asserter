/**
 * **dragee-allowed-self-dependency.rule :**
 * Dragee can have a self dependency meaning depending on itself.
 *
 * ## Examples
 *
 * Example of correct dragees for this rule:
 *
 * ```json
 * {
 *     "name": "OneSpecificAggregate",
 *     "profile": "ddd/aggregate"
 * },
 * {
 *     "name": "OneSpecificAggregate",
 *     "profile": "ddd/aggregate",
 *     "depends_on": {
 *         "OneSpecificAggregate": [
 *             "field"
 *         ]
 *     }
 * }
 * ```
 *
 * @module Aggregates Allowed Dependencies
 * @module ValueObject Allowed Dependencies
 * @module Entity Allowed Dependencies
 * @module Command Allowed Dependencies
 * @module BundledCommand Allowed Dependencies
 * @module Events Allowed Dependencies
 * @module Factories Allowed Dependencies
 * @module Repositories Allowed Dependencies
 * @module Services Allowed Dependencies
 *
 */
import {
    type RuleResult,
    RuleSeverity,
    directDependencies,
    expectDragee
} from '@dragee-io/type/asserter';
import type { Dragee, DrageeDependency } from '@dragee-io/type/common';

const assertDrageeDependency = ({ root, dependencies }: DrageeDependency): RuleResult[] => {
    const a = dependencies.map(dependency =>
        expectDragee(root, dependency, 'This dragee depends on itself', dragee => {
            return root.depends_on ? Object.keys(root.depends_on).includes(root.name) : true;
        })
    );

    console.log({ a: JSON.stringify(a), dependencies });

    return a;
};

export default {
    label: 'Dragees Allowed Self Dependency',
    severity: RuleSeverity.INFO,
    handler: (dragees: Dragee[]): RuleResult[] => {
        const fileteredDependencies = dragees
            .map(dragee => directDependencies(dragee, dragees))
            .filter(dep => dep.dependencies);

        const hasNoDependencies =
            Array.isArray(fileteredDependencies) && fileteredDependencies.length === 0;
        const silentPassResult: RuleResult[] = [
            {
                pass: true,
                ruleId: 'dragees-allowed-self-dependency'
            }
        ];

        if (hasNoDependencies) {
            return silentPassResult;
        }

        return dragees
            .map(dragee => directDependencies(dragee, dragees))
            .filter(dep => dep.dependencies)
            .flatMap(dep => assertDrageeDependency(dep));
    }
};
