let edible_items = {
    'minecraft:iron_ingot': {
        'hunger': 6,
        'desiredSaturation': 3,
        'alwaysEdible': true,
        'fastToEat': true,
        'meat': true,
        'effect': {
            'name': 'minecraft:speed',
            'duration': 600,
            'amplifier': 0,
            'probability': 100,
        }
    },
}

ItemEvents.modification((event) => {
    for(let [key, value] of Object.entries(edible_items)) {
        event.modify(key, (item) => {
            item.setFoodProperties((food) => {
                if (value.hunger != null && Number.isInteger(value.hunger)) {
                    food.hunger(value.hunger);
                }

                // This value does not directly translate to saturation points gained
                // The real value can be assumed to be:
                // min(hunger * saturation * 2 + saturation, foodAmountAfterEating)
                if (value.saturation != null && Number.isInteger(value.hunger)) {
                    food.saturation(value.saturation);
                } else if (value.hunger != null && Number.isInteger(value.hunger)) {
                    // let new_saturation = (value.hunger / (4 * value.hunger + 2) * 1.0).toFixed(2);
                    let desired = (value.hunger / 2) * 1.0;
                    if (value.desiredSaturation != null && typeof value.desiredSaturation === 'number') desired = value.desiredSaturation;

                    // let newSaturation = ((value.hunger / 2) * (1 / (2 * value.hunger + 1)) * 1.0).toFixed(2);
                    let newSaturation = (desired * (1 / (2 * value.hunger + 1)) * 1.0).toFixed(2);
                    // => desired = 2; newSaturation = 0.15

                    console.log("KJS1: " + desired);
                    console.log("KJS2: " + value.desiredSaturation);
                    console.log("KJS3: " + newSaturation);
                    console.log("KJS4: " + (value.hunger * newSaturation * 2 + newSaturation).toString());
                    food.saturation(newSaturation);
                }

                // Ex. golden apple
                if (value.alwaysEdible != null && typeof value.alwaysEdible === 'boolean') {
                    food.alwaysEdible(value.alwaysEdible);
                }

                // Ex. cooked kelp
                if (value.fastToEat != null && typeof value.fastToEat === 'boolean') {
                    food.fastToEat(value.fastToEat);
                }

                // Are dogs willing to eat it?
                if (value.meat != null && typeof value.meat === 'boolean') {
                    food.meat(value.meat);
                }

                if (value.effect != null) {
                    if (value.effect.name != null && typeof value.effect.name === 'string') {
                        if (value.effect.duration != null && Number.isInteger(value.hunger)) {
                            if (value.effect.amplifier != null && Number.isInteger(value.hunger)) {
                                if (value.effect.probability != null && Number.isInteger(value.hunger)) {
                                    food.effect(
                                        value.effect.name,
                                        value.effect.duration,
                                        value.effect.amplifier,
                                        value.effect.probability
                                    );
                                }
                            }
                        }
                    }
                }
            })
        })
    }
});
