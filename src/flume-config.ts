import { FlumeConfig, Controls, Colors } from "flume";

const flumeConfig = new FlumeConfig()

flumeConfig
    .addPortType({
        type: "nextStep",
        name: "nextStep",
        label: "Next step",
        color: Colors.yellow,
        acceptTypes: ["nextStep", "onTrue", "onFalse"],
        noControls: true
    })
    .addPortType({
        type: "onTrue",
        name: "onTrue",
        label: "On true",
        color: Colors.green,
        acceptTypes: ["nextStep"],
        noControls: true
    })
    .addPortType({
        type: "onFalse",
        name: "onFalse",
        label: "On false",
        color: Colors.pink,
        acceptTypes: ["nextStep"],
        noControls: true
    })
    .addPortType({
        type: "text",
        name: "text",
        label: "Text",
        color: Colors.pink,
        controls: [
            Controls.text({
                name: "text",
                label: "Text",
            })
        ]
    })
    .addPortType({
        type: "optionFlow",
        name: "optionFlow",
        label: "optionFlow",
        color: Colors.grey,
        noControls: true,
    })
    .addPortType({
        type: "option",
        name: "option",
        label: "Option",
        color: Colors.pink,
        controls: [
            Controls.text({
                name: "text",
                label: "Text",
            })
        ]
    })
    .addNodeType({
        type: "startScenario",
        label: "Start scenario",
        initialWidth: 150,
        inputs: ports => [
            ports.text({label: "Scenario name", name: "scenarioName"})
        ],
        outputs: ports => [
            ports.nextStep()
        ]
    })
    .addNodeType({
        type: "goToScenario",
        label: "Go to scenario",
        initialWidth: 150,
        inputs: ports => [
            ports.nextStep({label: "Previous step", name: "previousStep"}),
            ports.text({label: "Scenario name", name: "scenarioName"})
        ]
    })
    .addNodeType({
        type: "changeBackground",
        label: "Change background",
        initialWidth: 150,
        inputs: ports => [
            ports.nextStep({label: "Previous step", name: "previousStep"}),
            ports.text({ label: "Background name", name: "backgroundName"}),
        ],
        outputs: ports => [
            ports.nextStep(),
        ]
    })
    .addNodeType({
        type: "changeLevel",
        label: "Change level",
        initialWidth: 150,
        inputs: ports => [
            ports.nextStep({label: "Previous step", name: "previousStep"}),
            ports.text({ label: "Level name", name: "levelName"}),
        ]
    })
    .addNodeType({
        type: "dialogue",
        label: "Dialogue",
        initialWidth: 150,
        inputs: ports => [
            ports.nextStep({label: "Previous step", name: "previousStep"}),
            ports.text({ label: "Name", name: "characterName" }),
            ports.text({ label: "Avatar", name: "characterAvatar" }),
            ports.text({ label: "Dialogue", name: "characterDialogue" }),
        ],
        outputs: ports => [
            ports.nextStep(),
        ]
    })
    .addNodeType({
        type: "checkInventory",
        label: "Check inventory",
        initialWidth: 150,
        inputs: ports => [
            ports.nextStep({label: "Previous step", name: "previousStep"}),
            ports.text({ label: "Item name", name: "itemName" }),
        ],
        outputs: ports => [
            ports.onTrue(),
            ports.onFalse(),
        ]
    })
    .addNodeType({
        type: "addToInventory",
        label: "Add to inventory",
        initialWidth: 150,
        inputs: ports => [
            ports.nextStep({label: "Previous step", name: "previousStep"}),
            ports.text({ label: "Item name", name: "itemName" }),
        ],
        outputs: ports => [
            ports.nextStep(),
        ]
    })
    .addNodeType({
        type: "askQuestion",
        label: "Ask question",
        initialWidth: 150,
        inputs: ports => [
            ports.nextStep({label: "Previous step", name: "previousStep"}),
            ports.text({ label: "Question", name: "question" }),
        ],
        outputs: ports => [
            ports.optionFlow({label: "Options", name: "options"}),
            ports.nextStep({label: "Fallback", name: "fallback"}),
        ]
    })
    .addNodeType({
        type: "giveOption",
        label: "Give option",
        initialWidth: 150,
        inputs: ports => [
            ports.optionFlow({label: "Option in", name: "optionsIn"}),
            ports.option(),
        ],
        outputs: ports => [
            ports.nextStep({label: "On true", name: "onTrue"}),
        ]
    })

export default flumeConfig;