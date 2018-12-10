import CES from 'ces';
/**
  * @param data All of included components an object
  * @param data.component Function 
  * @param data.args Args to be given to component
  */
export const createAssemblege = (data) => {
    let components = Array.from(arguments);
    let entity = new CES.Entity();

    let assemblege = () => {
        loadComponents(entity, ...components);
        return entity;
    }
    assemblege.prototype.familyId = "$"+components
                                    .map(component => component.component.name)
                                    .join(",");
    return assemblege();
}

/**
  * @param entity Entity object to loads components for 
  * @param data All of included components an object
  * @param data.component Function 
  * @param data.args Args to be given to component
  */
export const loadComponents = (entity, ...data) => {
    data.forEach(component => {
        entity.addComponent(...component.args);
    });
    return entity;
}

export const createCompData = (fun, ...args) => {;
    return {component: fun, args: args};
}