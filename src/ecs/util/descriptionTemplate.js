const Template = (entity = {}) => ({
  color: () => {
    return (entity.color && entity.color.label)
  }
})

export default Template
