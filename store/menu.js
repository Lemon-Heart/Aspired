export const state = () => ({
  menuList: [
    {
      icon: 'we',
      title: 'Мы',
      open: false,
      subMenu: [
        {
          title: 'О нас',
          to: '/about'
        },
        {
          title: 'Отзывы',
          to: '/reviews'
        },
        {
          title: 'Команда',
          to: '/team'
        }
      ]
    },
    {
      icon: 'portfolio',
      title: 'Портфолио',
      to: '/portfolio'
    },
    {
      icon: 'services',
      title: 'Услуги',
      open: false,
      subMenu: [
        {
          title: 'Разработка',
          to: '/development'
        },
        {
          title: 'Интернет-маркетинг',
          to: '/marketing'
        },
        {
          title: 'Графический дизайн',
          to: '/design'
        }
      ]
    },
    {
      icon: 'contacts',
      title: 'Контакты',
      to: '/contacts'
    }
  ]
})

export const mutations = {
  toogleChoiseSubmenu (state, item) {
    if (state.menuList[item].subMenu) {
      state.menuList[item].open = !state.menuList[item].open
    } else {
      delete state.menuList[item].open
    }
  },
  closeAllSubmenu (state) {
    state.menuList = state.menuList.map((item) => {
      if (item.open) {
        item.open = false
      }
      return item
    })
  }
}

export const getters = {
  getMenuList: s => s.menuList
}
