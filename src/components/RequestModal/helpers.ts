export const prepareFormStateData = (formData: Object) =>
    Object.keys(formData)
        .filter((key) => Boolean(formData[key]))
        .reduce((prepared, key) => ({ ...prepared, [key]: formData[key] }), {});
