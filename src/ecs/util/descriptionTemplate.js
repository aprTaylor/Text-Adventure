const Template = (entity = {}) => ({
  color: () => {
    return entity.color.label
  }
})

export default Template
