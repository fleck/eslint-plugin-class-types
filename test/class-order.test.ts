import rule from "../src/rules/class-order";
import RuleTester from "./JestRuleTester";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// var rule = require("../../../lib/rules/class-order");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
/**
 * Column of substrings found in classnames.d.ts
 *               14449         27813             32423      32555        32863           82326
 */
const validOrder =
  'ct("other", "font-bold", "text-sm", "text-indigo-600", "uppercase", "tracking-wide", "sm:tracking-wider")';

ruleTester.run("class-order", rule, {
  valid: [validOrder],

  invalid: [
    {
      code: `ct(
        "font-bold",
        "uppercase",
        "other",
        "sm:tracking-wider",
        "tracking-wide",
        "text-sm",
        "text-indigo-600"
      )`,
      errors: [
        {
          type: "CallExpression",
        },
      ],
      output: validOrder,
    },
  ],
});

const validOrderWithIdentifiers =
  'ct("other", "font-bold", "text-sm", "text-indigo-600", "uppercase", "tracking-wide", "sm:tracking-wider", otherStyle, sharedStyle)';

ruleTester.run("class-order", rule, {
  valid: [validOrderWithIdentifiers],

  invalid: [
    {
      code: `ct(
        otherStyle,
        "font-bold",
        "uppercase",
        sharedStyle,
        "other",
        "sm:tracking-wider",
        "tracking-wide",
        "text-sm",
        "text-indigo-600"
      )`,
      errors: [
        {
          type: "CallExpression",
        },
      ],
      output: validOrderWithIdentifiers,
    },
  ],
});
