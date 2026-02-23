import { type Asserter, findRule, findRules } from '@fixentropy-io/type/asserter';

export default {
    namespace: 'ddd',
    rules: findRules('ddd', `${import.meta.dir}/src/rules/`),
    rule: (file: string) => findRule('ddd', `${import.meta.dir}/src/rules/`, file)
} satisfies Asserter;
