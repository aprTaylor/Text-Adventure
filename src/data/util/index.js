export const rand = {
  color: `${randomItem(['pink', 'jade', 'indigo', 'coal colored', 'ashen', 'emerald',
                        'lavender', 'olive green', 'lime green', 'ivory white', 'cream white', 'pearl white',
                         'tan', 'beige', 'gold', 'fire red', 'lemon yellow', 'rust red', 'amber', 'tangerine', 'orange',
                         'ruby', 'sangria', 'scarlet', 'crimson', 'peach', 'magenta', 'mauve', 'violet', 'boysenberry', 'lilac', 'periwinkle',
                         'sky blue', 'ebony', 'jet black', 'onyx', 'rouge', 'merigold', 'pistachio', 'sapphire',
                         'hazelnut', 'burgundy'
                      ])}`
}

export function randomItem(items) {
  return items[Math.floor(Math.random()*items.length)];   
}