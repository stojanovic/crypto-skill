# Crypto Alexa skill

This skill, actually a part of it, was develop at NoSlidesConf 2017 live coding session.

## Conference info

For more info about the conference visit: http://www.noslidesconf.net

## Skill setup

### Prerequisites

- Node.js, at least v4.
- AWS account, and AWS keys setup (see https://claudiajs.com/tutorials/installing.html for more info).
- Amazon Alexa, but you can use Alexa Developer Dashboard or some Alexa mobile app to test the skill.

### Setup

To setup the skill, do following:

1. Go to the Alexa Developer Dashboard and create a new skill: https://developer.amazon.com/edw/home.html#/skills.
2. On the step 1, "Skill information", fill a name (for example "Crypto currency bot") and an invocation name: "crypto". Then click the Save button, and then on the Next button.
3. In the Interaction Model, copy the intents from the [data/intents.json](./data/intents.json) file to the Intent Schema field.
4. Add the `COIN_TYPES` custom slot name, with the [data/custom_slots.txt](./data/custom_slots.txt) file content as a value, and then click on the Add button.
5. Add the values from the [data/sample_utterances.txt](./data/sample_utterances.txt) file in the Sample Utterances field and click on the Next button.
6. When the Alexa training is done, run the `npm run create` command to deploy the code to the AWS Lambda function.
7. Then run the `npm run allowTrigger` command to allow Alexa to invoke that Lambda function. This step will return a JSON with a role info. Copy the role value, because you'll need it for the next step.
8. In the Configuration step of Alexa Dashboard, select the "AWS Lambda ARN" option, and then paste the role ARN, from the previous step, to the Default field and click on the Next button.
9. Your skill is successfully setup, enjoy the convesation with Alexa :)

## Interaction

Try saying:

- "Alexa, start crypto"
- "Alexa, ask crypto for bitcoin price"
- "Alexa, ask crypto what's the value of ethereum"
- "Alexa, ask crypto what was the price of ethereum yesterday"

## Debugging

In case of the problem, try running `npm run logs` command which should print the  AWS CloudWatch logs in the console.

## License

MIT - See [LICENSE](LICENSE)