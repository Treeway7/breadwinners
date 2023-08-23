ServerEvents.tags('item', (event) => {
    // Seed Pouch
    event.add('quark:seed_pouch_holdable', 'farmersdelight:onion')

    // Bread
    event.add('forge:bread', ['autumnity:pumpkin_bread', 'neapolitan:banana_bread', 'reliquary:glowing_bread', 'some_assembly_required:burger_bun'])

    // Bread Slices
});
