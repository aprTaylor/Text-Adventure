const Template = (entity = {}) => {
  let getter = {};

  Object.keys(entity).forEach(key => {
    let component = entity[key];
    let compKeys = Object.keys(component);

    if(compKeys.length > 1) getter[key] = component;
    else getter[key] = component[compKeys[0]];
  });

  return getter;
}

export default Template
