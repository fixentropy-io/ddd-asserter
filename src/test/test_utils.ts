import { createRuleFailedOnAsserter, createRulePassedOnAsserter } from '@fixentropy-io/type/test-utils';
import dddAsserter from '../..';

export const rulePassed = createRulePassedOnAsserter(dddAsserter, require);

export const ruleFailed = createRuleFailedOnAsserter(dddAsserter, require);
