/**
 * **commands-allowed-dependencies :**
 * Commands can only have dependencies of type "ddd/aggregate"
 *
 * ## Examples
 *
 * Example of incorrect dragees for this rule:
 *
 * ```json
 *
 * ```
 * Example of correct dragees for this rule:
 *
 * ```json
 *
 * ```
 *
 * @module BundleCommands Allowed Dependencies
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
  bundledCommandProfile,
  commandProfile,
  profileOf,
  profiles,
} from "../ddd.model.ts";

const assertDrageeDependency = ({
  root,
  dependencies,
}: DrageeDependency): RuleResult[] =>
  dependencies.map((dependency) =>
    expectDragee(
      root,
      dependency,
      `This bundled command must only have a dependency of type "${commandProfile}"`,
      (dragee) => profileOf(dragee, commandProfile)
    )
  );

export default {
  label: "Bundled Commands Allowed Dependencies",
  severity: RuleSeverity.ERROR,
  handler: (dragees: Dragee[]): RuleResult[] =>
    profiles[bundledCommandProfile]
      .findIn(dragees)
      .map((bundledCommand) => directDependencies(bundledCommand, dragees))
      .filter((dep) => dep.dependencies)
      .flatMap((dep) => assertDrageeDependency(dep)),
};
