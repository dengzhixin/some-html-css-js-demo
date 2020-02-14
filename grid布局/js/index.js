  const navMenuItems = document.querySelectorAll(".nav-menu")
  const sectionItems = document.querySelectorAll("section")
  console.log(sectionItems)

  const indicator = document.querySelector(".indicator")
  handleMenuItemClick(navMenuItems[0])

  function handleMenuItemClick(target) {
    navMenuItems.forEach((item) => {
      item.classList.remove("active")
      item.style = ""
    })
    let activeSection = document.querySelector(".activeSection")
    activeSection.classList.remove('activeSection')
    target.classList.add('active')
    indicator.style.width = `${target.offsetWidth}px`
    indicator.style.left = `${target.offsetLeft}px`
    sectionItems[target.getAttribute('data-ref')].classList.add('activeSection')
  }

  navMenuItems.forEach((item) => {
    item.addEventListener('click', e => handleMenuItemClick(e.target))
  })