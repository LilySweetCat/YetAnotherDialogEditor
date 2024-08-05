import { FlumeConfig, Controls, Colors } from "flume";

const flumeConfig = new FlumeConfig()

flumeConfig
    .addPortType({
        type: "nextStep",
        name: "nextStep",
        label: "Next step",
        color: Colors.yellow,
        noControls: true
    })
    .addPortType({
        type: "onTrue",
        name: "onTrue",
        label: "On true",
        color: Colors.green,
        noControls: true
    })
    .addPortType({
        type: "onFalse",
        name: "onFalse",
        label: "On false",
        color: Colors.red,
        noControls: true
    })
    .addPortType({
        type: "text",
        name: "text",
        label: "Text",
        color: Colors.red,
        controls: [
            Controls.text({
                name: "txt",
                label: "Text",
            })
        ]
    })
    .addNodeType({
        type: "startScenario",
        label: "Start scenario",
        initialWidth: 150,
        inputs: ports => [
            ports.text({label: 'scenario name', name: 'scenarioName'})
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
            ports.nextStep(),
            ports.text({label: 'scenario name', name: 'scenarioName'})
        ]
    })
    .addNodeType({
        type: "changeBackground",
        label: "Change background",
        initialWidth: 150,
        inputs: ports => [
            ports.nextStep(),
            ports.text({ label: "background name", name: 'backgroundName'}),
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
            ports.nextStep(),
            ports.text({ label: "level name", name: 'levelName'}),
        ]
    })
    .addNodeType({
        type: "dialogue",
        label: "Dialogue",
        initialWidth: 150,
        inputs: ports => [
            ports.nextStep(),
            ports.text({ label: "name", name: 'characterName' }),
            ports.text({ label: "avatar", name: 'characterAvatar' }),
            ports.text({ label: "dialogue", name: 'characterDialogue' }),
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
            ports.nextStep(),
            ports.text({ label: "item name", name: 'itemName' }),
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
            ports.nextStep(),
            ports.text({ label: "item name", name: 'itemName' }),
        ],
        outputs: ports => [
            ports.nextStep(),
        ]
    })

export default flumeConfig;