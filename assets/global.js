$('.icon-search').click(function(){
  $('.search-mob').toggleClass('search-mob-show');
});

$('.live-search-form-field').click(function(){
  $('.search-mob').addClass('search-wrap-mobile-active');
  $('.main-top').addClass('scroll-locked');
});

$('.live-search-takeover-cancel').click(function(){
  $('.search-mob').removeClass('search-wrap-mobile-active');
  $('.main-top').removeClass('scroll-locked');
});

$('.menubar').click(function(){
  $('.mobile-nav-overlay').addClass('mobile-nav-overlay-active');
  $('.site-mobile-nav').addClass('site-mobile-nav-active');
  $('.main-top').addClass('scroll-locked');
});

$('.mobile-nav-close').click(function(){
  $('.site-mobile-nav').removeClass('site-mobile-nav-active');
  $('.mobile-nav-overlay').removeClass('mobile-nav-overlay-active');
  $('.main-top').removeClass('scroll-locked');
});

           $(".menu-item-has-children a").on('click', function(e){
            //e.preventDefault();
            //e.stopPropagation();
            // var eleHeight = $(this).next().height();
            // $("#mobile-main-menu").css('height', eleHeight+'px');
            $(this).closest('.slider').css('transform','translateX(-100%)');

            $(".controls .slide-menu-control").css('visibility', 'visible');
            $(".mobile-nav-panel").scrollTop(0);
             $(".slide-menu-control.back-btn").removeClass("level-1-main-bk");
           $(".slide-menu-control.back-btn").removeClass("level-2-main-bk");
            $(".slide-menu-control.back-btn").removeClass("level-3-main-bk");
            
            if($(this).hasClass("level-1")){  
              $(this).next().show(); 
              $(this).next().css('transform','translateX(0%)');
                $(".slide-menu-control.back-btn").addClass("level-1-main-bk");
                       
            }
            else if($(this).hasClass("level-2")){
              $(".slide-menu-control.back-btn").addClass("level-2-main-bk"); 
              $(this).next().show();
              $(".level-1-main").css('transform','translateX(-100%)');
             $(this).next().css('transform','translateX(0%)');
            }
            else if($(this).hasClass("level-3")){
              $(".slide-menu-control.back-btn").addClass("level-3-main-bk");  
              (this).next().show();
              $(".level-2-main").css('transform','translateX(-100%)');
                           $(this).next().css('transform','translateX(0%)');
            }
          });
 


               $(".slide-menu-control.back-btn").on('click', function(e){
      e.preventDefault();

             $("#mobile-main-menu").css('height', 'auto');
    
                 if($(this).hasClass("level-1-main-bk")){
                  $(this).css('visibility', 'hidden');   
                  $('.slider').css('transform','translateX(0%)');
                   $(".level-1-main").hide();
                $(this).removeClass("level-1-main-bk");
                 }
                 else if($(this).hasClass("level-2-main-bk")){
                     $(".level-2-main").hide();
                  $(".level-1-main").each(function(i,g){
                    var f=$(this).css("display");
                    if(f == "block"){
                        $(this).css('transform','translateX(0%)');
                    }
                  });
                   $(this).addClass("level-1-main-bk");
                   $(this).removeClass("level-2-main-bk");
                 }
                 else if($(this).hasClass("level-3-main-bk")){
                   $(".level-1-main").hide();
                    
                   $(".level-2-main").each(function(i,g){
                    var f=$(this).css("display");
                    if(f == "block"){
                        $(this).css('transform','translateX(0%)');
                    }
                  });
                    $(this).addClass("level-2-main-bk");
                    $(this).removeClass("level-3-main-bk");
                 }
          });



function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

const trapFocusHandlers = {};

function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = (event) => {
    if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
      return;

    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function() {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function(event) {
    if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if (
      (event.target === container || event.target === first) &&
      event.shiftKey
    ) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);

  elementToFocus.focus();
}

// Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.
try {
  document.querySelector(":focus-visible");
} catch {
  focusVisiblePolyfill();
}

function focusVisiblePolyfill() {
  const navKeys = ['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'TAB', 'ENTER', 'SPACE', 'ESCAPE', 'HOME', 'END', 'PAGEUP', 'PAGEDOWN']
  let currentFocusedElement = null;
  let mouseClick = null;

  window.addEventListener('keydown', (event) => {
    if(navKeys.includes(event.code.toUpperCase())) {
      mouseClick = false;
    }
  });

  window.addEventListener('mousedown', (event) => {
    mouseClick = true;
  });

  window.addEventListener('focus', () => {
                          if (currentFocusedElement) currentFocusedElement.classList.remove('focused');

  if (mouseClick) return;

  currentFocusedElement = document.activeElement;
  currentFocusedElement.classList.add('focused');

}, true);
}

function pauseAllMedia() {
  document.querySelectorAll('.js-youtube').forEach((video) => {
    video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  });
  document.querySelectorAll('.js-vimeo').forEach((video) => {
    video.contentWindow.postMessage('{"method":"pause"}', '*');
  });
  document.querySelectorAll('video').forEach((video) => video.pause());
  document.querySelectorAll('product-model').forEach((model) => {
    if (model.modelViewerUI) model.modelViewerUI.pause();
  });
}

function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
}

function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== 'ESCAPE') return;

  const openDetailsElement = event.target.closest('details[open]');
  if (!openDetailsElement) return;

  const summaryElement = openDetailsElement.querySelector('summary');
  openDetailsElement.removeAttribute('open');
  summaryElement.focus();
}

class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input');
    this.changeEvent = new Event('change', { bubbles: true })

    this.querySelectorAll('button').forEach(
      (button) => button.addEventListener('click', this.onButtonClick.bind(this))
    );
  }

  onButtonClick(event) {
    event.preventDefault();
    const previousValue = this.input.value;

    event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
    if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
  }
}

customElements.define('quantity-input', QuantityInput);

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function fetchConfig(type = 'json') {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
  };
}

/*
 * Shopify Common JS
 *
 */
if ((typeof window.Shopify) == 'undefined') {
  window.Shopify = {};
}

Shopify.bind = function(fn, scope) {
  return function() {
    return fn.apply(scope, arguments);
  }
};

Shopify.setSelectorByValue = function(selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};

Shopify.addListener = function(target, eventName, callback) {
  target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent('on'+eventName, callback);
};

Shopify.postLink = function(path, options) {
  options = options || {};
  var method = options['method'] || 'post';
  var params = options['parameters'] || {};

  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for(var key in params) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

Shopify.CountryProvinceSelector = function(country_domid, province_domid, options) {
  this.countryEl         = document.getElementById(country_domid);
  this.provinceEl        = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);

  Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler,this));

  this.initCountry();
  this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function() {
    var value = this.countryEl.getAttribute('data-default');
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },

  initProvince: function() {
    var value = this.provinceEl.getAttribute('data-default');
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },

  countryHandler: function(e) {
    var opt       = this.countryEl.options[this.countryEl.selectedIndex];
    var raw       = opt.getAttribute('data-provinces');
    var provinces = JSON.parse(raw);

    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = 'none';
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement('option');
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }

      this.provinceContainer.style.display = "";
    }
  },

  clearOptions: function(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },

  setOptions: function(selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement('option');
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  }
};

class MenuDrawer extends HTMLElement {
  constructor() {
    super();

    this.mainDetailsToggle = this.querySelector('details');
    //const summaryElements = this.querySelectorAll('summary');
    // this.addAccessibilityAttributes(summaryElements);

    if (navigator.platform === 'iPhone') document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);

    this.addEventListener('keyup', this.onKeyUp.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.bindEvents();
  }

  bindEvents() {
    this.querySelectorAll('summary').forEach(summary => summary.addEventListener('click', this.onSummaryClick.bind(this)));
    this.querySelectorAll('button').forEach(button => button.addEventListener('click', this.onCloseButtonClick.bind(this)));
  }

  addAccessibilityAttributes(summaryElements) {
    summaryElements.forEach(element => {
      element.setAttribute('role', 'button');
      element.setAttribute('aria-expanded', false);
      element.setAttribute('aria-controls', element.nextElementSibling.id);
    });
  }

  onKeyUp(event) {
    if(event.code.toUpperCase() !== 'ESCAPE') return;

    const openDetailsElement = event.target.closest('details[open]');
    if(!openDetailsElement) return;

    openDetailsElement === this.mainDetailsToggle ? this.closeMenuDrawer(this.mainDetailsToggle.querySelector('summary')) : this.closeSubmenu(openDetailsElement);
  }

  onSummaryClick(event) {
    const summaryElement = event.currentTarget;
    const detailsElement = summaryElement.parentNode;
    const isOpen = detailsElement.hasAttribute('open');

    if (detailsElement === this.mainDetailsToggle) {
      if(isOpen) event.preventDefault();
      isOpen ? this.closeMenuDrawer(summaryElement) : this.openMenuDrawer(summaryElement);
    } else {
      trapFocus(summaryElement.nextElementSibling, detailsElement.querySelector('button'));

      setTimeout(() => {
                 detailsElement.classList.add('menu-opening');
    });
  }
}

// openMenuDrawer(summaryElement) {
//   setTimeout(() => {
//              this.mainDetailsToggle.classList.add('menu-opening');
// });
// summaryElement.setAttribute('aria-expanded', true);
// trapFocus(this.mainDetailsToggle, summaryElement);
// document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
// }

// closeMenuDrawer(event, elementToFocus = false) {
//   if (event !== undefined) {
//     this.mainDetailsToggle.classList.remove('menu-opening');
//     this.mainDetailsToggle.querySelectorAll('details').forEach(details =>  {
//       details.removeAttribute('open');
//       details.classList.remove('menu-opening');
//     });
//     this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
//     document.body.classList.remove(`overflow-hidden-${this.dataset.breakpoint}`);
//     removeTrapFocus(elementToFocus);
//     this.closeAnimation(this.mainDetailsToggle);
//   }
// }

onFocusOut(event) {
  setTimeout(() => {
             if (this.mainDetailsToggle.hasAttribute('open') && !this.mainDetailsToggle.contains(document.activeElement)) this.closeMenuDrawer();
});
}

onCloseButtonClick(event) {
  const detailsElement = event.currentTarget.closest('details');
  this.closeSubmenu(detailsElement);
}

 closeSubmenu(detailsElement) {
//   detailsElement.classList.remove('menu-opening');
//   removeTrapFocus();
//   this.closeAnimation(detailsElement);
 }

closeAnimation(detailsElement) {
  let animationStart;

  const handleAnimation = (time) => {
    if (animationStart === undefined) {
      animationStart = time;
    }

    const elapsedTime = time - animationStart;

    if (elapsedTime < 400) {
      window.requestAnimationFrame(handleAnimation);
    } else {
      detailsElement.removeAttribute('open');
      if (detailsElement.closest('details[open]')) {
        trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
      }
    }
  }

  window.requestAnimationFrame(handleAnimation);
}
}

customElements.define('menu-drawer', MenuDrawer);

class HeaderDrawer extends MenuDrawer {
  constructor() {
    super();
  }

  openMenuDrawer(summaryElement) {
    this.header = this.header || document.getElementById('shopify-section-header');
    this.borderOffset = this.borderOffset || this.closest('.header-wrapper').classList.contains('header-wrapper--border-bottom') ? 1 : 0;
    document.documentElement.style.setProperty('--header-bottom-position', `${parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset)}px`);

    setTimeout(() => {
               this.mainDetailsToggle.classList.add('menu-opening');
  });

summaryElement.setAttribute('aria-expanded', true);
trapFocus(this.mainDetailsToggle, summaryElement);
document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
}
}

customElements.define('header-drawer', HeaderDrawer);

class ModalDialog extends HTMLElement {
  constructor() {
    super();
    this.querySelector('[id^="ModalClose-"]').addEventListener(
      'click',
      this.hide.bind(this)
    );
    this.addEventListener('keyup', (event) => {
      if (event.code.toUpperCase() === 'ESCAPE') this.hide();
    });
    if (this.classList.contains('media-modal')) {
      this.addEventListener('pointerup', (event) => {
        if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) this.hide();
      });
    } else {
      this.addEventListener('click', (event) => {
        if (event.target.nodeName === 'MODAL-DIALOG') this.hide();
      });
    }
  }

  show(opener) {
    this.openedBy = opener;
    const popup = this.querySelector('.template-popup');
    document.body.classList.add('overflow-hidden');
    this.setAttribute('open', '');
    if (popup) popup.loadContent();
    trapFocus(this, this.querySelector('[role="dialog"]'));
    window.pauseAllMedia();
  }

  hide() {
    document.body.classList.remove('overflow-hidden');
    this.removeAttribute('open');
    removeTrapFocus(this.openedBy);
    window.pauseAllMedia();
  }
}
customElements.define('modal-dialog', ModalDialog);

class ModalOpener extends HTMLElement {
  constructor() {
    super();

    const button = this.querySelector('button');

    if (!button) return;
    button.addEventListener('click', () => {
                            const modal = document.querySelector(this.getAttribute('data-modal'));
    if (modal) modal.show(button);
  });
}
}
customElements.define('modal-opener', ModalOpener);

class DeferredMedia extends HTMLElement {
  constructor() {
    super();
    const poster = this.querySelector('[id^="Deferred-Poster-"]');
    if (!poster) return;
    poster.addEventListener('click', this.loadContent.bind(this));
  }

  loadContent() {
    window.pauseAllMedia();
    if (!this.getAttribute('loaded')) {
      const content = document.createElement('div');
      content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));

      this.setAttribute('loaded', true);
      this.appendChild(content.querySelector('video, model-viewer, iframe')).focus();
    }
  }
}

customElements.define('deferred-media', DeferredMedia);

class SliderComponent extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector('ul');
    this.sliderItems = this.querySelectorAll('li');
    this.pageCount = this.querySelector('.slider-counter--current');
    this.pageTotal = this.querySelector('.slider-counter--total');
    this.prevButton = this.querySelector('button[name="previous"]');
    this.nextButton = this.querySelector('button[name="next"]');

    if (!this.slider || !this.nextButton) return;

    const resizeObserver = new ResizeObserver(entries => this.initPages());
    resizeObserver.observe(this.slider);

    this.slider.addEventListener('scroll', this.update.bind(this));
    this.prevButton.addEventListener('click', this.onButtonClick.bind(this));
    this.nextButton.addEventListener('click', this.onButtonClick.bind(this));
  }

  initPages() {
    const sliderItemsToShow = Array.from(this.sliderItems).filter(element => element.clientWidth > 0);
    this.sliderLastItem = sliderItemsToShow[sliderItemsToShow.length - 1];
    if (sliderItemsToShow.length === 0) return;
    this.slidesPerPage = Math.floor(this.slider.clientWidth / sliderItemsToShow[0].clientWidth);
    this.totalPages = sliderItemsToShow.length - this.slidesPerPage + 1;
    this.update();
  }

  update() {
    if (!this.pageCount || !this.pageTotal) return;
    this.currentPage = Math.round(this.slider.scrollLeft / this.sliderLastItem.clientWidth) + 1;

    if (this.currentPage === 1) {
      this.prevButton.setAttribute('disabled', true);
    } else {
      this.prevButton.removeAttribute('disabled');
    }

    if (this.currentPage === this.totalPages) {
      this.nextButton.setAttribute('disabled', true);
    } else {
      this.nextButton.removeAttribute('disabled');
    }

    this.pageCount.textContent = this.currentPage;
    this.pageTotal.textContent = this.totalPages;
  }

  onButtonClick(event) {
    event.preventDefault();
    const slideScrollPosition = event.currentTarget.name === 'next' ? this.slider.scrollLeft + this.sliderLastItem.clientWidth : this.slider.scrollLeft - this.sliderLastItem.clientWidth;
    this.slider.scrollTo({
      left: slideScrollPosition
    });
  }
}

customElements.define('slider-component', SliderComponent);

class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);
    // this.updatePickupAvailability();
    this.removeErrorMessage();

    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
      

      var op=[];
      $(".option-value-input:checked").each(function(){
      op.push($(this).data("v"));      
      });
     var j=op.join(" / ");

        $(".v-option option").each(function(){
           $(this).attr("selected",false);
             if(j == $(this).data("variant")){
               $(this).attr("selected",true);
               $(".v-option").trigger("change");
               
             }
        });
       
    }
  }

  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  updateMedia() {
    if (!this.currentVariant) return;
    if (!this.currentVariant.featured_media) return;
    const newMedia = document.querySelector(
      `[data-media-id="${this.dataset.section}-${this.currentVariant.featured_media.id}"]`
    );

    if (!newMedia) return;
    const modalContent = document.querySelector(`#ProductModal-${this.dataset.section} .product-media-modal__content`);
    const newMediaModal = modalContent.querySelector( `[data-media-id="${this.currentVariant.featured_media.id}"]`);
    const parent = newMedia.parentElement;
    if (parent.firstChild == newMedia) return;
    modalContent.prepend(newMediaModal);
    parent.prepend(newMedia);
    this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
    if(this.stickyHeader) {
      this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
    }
    window.setTimeout(() => { parent.querySelector('li.product__media-item').scrollIntoView({behavior: "smooth"}); });
}

updateURL() {
  if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
  window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
}

updateVariantInput() {
  const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment`);
  productForms.forEach((productForm) => {
    const input = productForm.querySelector('input[name="id"]');
    input.value = this.currentVariant.id;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

updatePickupAvailability() {
  const pickUpAvailability = document.querySelector('pickup-availability');
  if (!pickUpAvailability) return;

  if (this.currentVariant && this.currentVariant.available) {
    pickUpAvailability.fetchAvailability(this.currentVariant.id);
  } else {
    pickUpAvailability.removeAttribute('available');
    pickUpAvailability.innerHTML = '';
  }
}

removeErrorMessage() {
  const section = this.closest('section');
  if (!section) return;

  const productForm = section.querySelector('product-form');
  // if (productForm) productForm.handleErrorMessage();
}

renderProductInfo() {
  fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`)
  .then((response) => response.text())
  .then((responseText) => {
    const id = `price-${this.dataset.section}`;
    const html = new DOMParser().parseFromString(responseText, 'text/html')
    const destination = document.getElementById(id);
    const source = html.getElementById(id);

    if (source && destination) destination.innerHTML = source.innerHTML;

    const price = document.getElementById(`price-${this.dataset.section}`);

    if (price) price.classList.remove('visibility-hidden');
    this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
  });
}

toggleAddButton(disable = true, text, modifyClass = true) {
  const productForm = document.getElementById(`product-form-${this.dataset.section}`);
  if (!productForm) return;
  const addButton = productForm.querySelector('[name="add"]');
  const addButtonText = productForm.querySelector('[name="add"] > span');

  if (!addButton) return;

  if (disable) {
    addButton.setAttribute('disabled', true);
    if (text) addButtonText.textContent = text;
  } else {
    addButton.removeAttribute('disabled');
    addButtonText.textContent = window.variantStrings.addToCart;
  }

  if (!modifyClass) return;
}

setUnavailable() {
  const v= false;
  const button = document.getElementById(`product-form-${this.dataset.section}`);
  const addButton = button.querySelector('[name="add"]');
  const addButtonText = button.querySelector('[name="add"] > span');
  const price = document.getElementById(`price-${this.dataset.section}`);
  if (!addButton) return;
  addButtonText.textContent = window.variantStrings.unavailable;
  if (price) price.classList.add('visibility-hidden');
  if(v == false ){
 var selectedFirst=$('variant-radios .product-form__input:first input:checked').parent().next();
  $(selectedFirst).find("input").trigger("click");

  }
    
}

getVariantData() {
  this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
  return this.variantData;
}
}

customElements.define('variant-selects', VariantSelects);

class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }

  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
  }
}

customElements.define('variant-radios', VariantRadios);
var productJson = window.productJson.product;
var showMore=$("#prd2").val();
if(showMore == "true"){
  console.log(showMore);
var productJson1 = window.productJson1.product;
}
var showMore1=$("#prd3").val();
if(showMore1 == "true"){
  console.log(showMore);
var productJson2 = window.productJson2.product;
}
if(productJson != null){
var selectedFirstVar1 = $('variant-radios .product-form__input:first input:checked').val();
var selectedFirstVar2 = $('variant-radios .product-form__input').eq(1).find('input:checked').val();

selectedVariantOnLoad(selectedFirstVar1, selectedFirstVar2);

function selectedVariantOnLoad(selectedVar1, selectedVar2) {
  
  $('[data-title]').hide();
  // $('[data-title]').addClass("soldout");
  $('.product-form__input:first [data-title]').show();
  $('.product-form__input').eq(1).find('[data-title]').show();
  
  
  
  const arrayPush = [];
 
  
  productJson.variants.forEach(function(variant, index) {
    if (variant.options[0] == selectedVar1 && variant.options[1] == selectedVar2) {
      arrayPush.push(variant.options[1]);
      arrayPush.push(variant.options[2]);
     
    }
  });

  
  arrayPush.forEach(function(data, index) {
    if($("#quote1").val() == "true"){
      var m=data.replaceAll('"','');
      }else{
      var m=data;
      }
    $('variant-radios .product-form__input [data-title]').each(function() {
      
      if ($.trim($(this).attr('data-title')) == $.trim(m)) {
        $('[data-title="'+m+'"]').show().addClass('active');
       
         
      }
    });
   
  });
  
   arrayPush.splice(0, arrayPush.length);
  productJson.variants.forEach(function(variant, index) {
    if (variant.options[0] == selectedVar1) {
      arrayPush.push(variant.options[1]);
     
    }
  });
  console.log("d",arrayPush);
  $('variant-radios .product-form__input').eq(1).find('[data-title]').hide();

  arrayPush.forEach(function(data, index) {
    if($("#quote1").val() == "true"){
      var m=data.replaceAll('"','');
      }else{
      var m=data;
      }
    $('variant-radios .product-form__input [data-title]').each(function() {
      
      if ($.trim($(this).attr('data-title')) == $.trim(m)) {
        $('[data-title="'+m+'"]').show();
      
      }
    });
  });
  
  
   arrayPush.splice(0, arrayPush.length);
  productJson.variants.forEach(function(variant, index) {
    if (variant.options[1] == selectedVar2) {
      arrayPush.push(variant.options[2]);
      
    }
  });
   selectedVar1=$('variant-radios .product-form__input:first input:checked').val();
selectedVar2=$('variant-radios .product-form__input').eq(1).find('input:checked').val();
arrayPush.splice(0, arrayPush.length);
   $('variant-radios .product-form__input').eq(2).find('[data-title]').hide();
  
  productJson.variants.forEach(function(variant, index) {
    if (variant.options[0] == selectedVar1 && variant.options[1] == selectedVar2) {
      arrayPush.push(variant.options[2]);
    }
  });
 
var che;
  var c=100;
  arrayPush.forEach(function(data, index) {
     if($("#quote1").val()== "true"){
     
      var m=data.replaceAll('"','');
      }else{
      var m=data;
      }
    $('variant-radios .product-form__input').eq(2).find('[data-title]').each(function(i,d) {
      if ($.trim($(this).attr('data-title')) == $.trim(m)) {
        $('[data-title="'+m+'"]').show();
       che = $(this).find("input:checked").val();
        if(c == 100){
        c=i; 
        }
      }
    });
  });
  
 checkedSoldout();
}
function checkedSoldout(){
var option1=$('variant-radios .product-form__input:first input:checked').val();
  var option2=$('variant-radios .product-form__input').eq(1).find('input:checked').val();
 
   $('variant-radios .product-form__input').eq(2).find('[data-title]').addClass("soldout");
  var arrayAvailable1=[]; 
  var v1={};
  productJson.variants.forEach(function(variant, index) {
    if (variant.options[0] == option1 && variant.options[1] == option2) {
      v1={"key":variant.options[2],"value":variant.available};
      arrayAvailable1.push(v1);
    }
  }); 
 $('variant-radios .product-form__input [data-title]').each(function() {
   var m=$(this).attr('data-title');
      arrayAvailable1.forEach(function(d, i) {
            if($("#quote1").val() == "true"){  var n=d.key.replaceAll('"','');}else{var n=d.key;}
                if($.trim(n) == $.trim(m) && d.value == true){
                  $('[data-title="'+n+'"]').removeClass("soldout");
                }
            
          });
      
    });

}

$('variant-radios .product-form__input').eq(0).find('input').click(function() {
  var selectedVar1 = $('variant-radios .product-form__input:first input:checked').val();
  var selectedVar2 = $('variant-radios .product-form__input').eq(1).find('input:checked').val();
  
  const arrayPush = [];
  var che;
  var c=100;
  const arrayPush1 = [];
  var che1;
  var c1=100;
  
    const arrayPush2 = [];
  var che2;
  var c2=100;
  
 $('variant-radios .product-form__input').eq(1).find('[data-title]').hide();
  productJson.variants.forEach(function(variant, index) {
    if (variant.options[0] == selectedVar1 ) {
      arrayPush.push(variant.options[1]);
    }
  });
 console.log("arr",arrayPush);
  arrayPush.forEach(function(data, index) {
    if($("#quote1").val()== "true"){
      var m=data.replaceAll('"','');
      }else{
      var m=data;
      }
    $('variant-radios .product-form__input').eq(1).find('[data-title]').each(function(i,d) {
      if ($.trim($(this).attr('data-title')) == $.trim(m)) {
        $('[data-title="'+m+'"]').show();
        che1 = $(this).find("input:checked").val();
        if(c1 == 100){
        c1=i; 
        }
      }
    });
  });
  
   
    arrayPush.forEach(function(data, index) {
    if($("#quote1").val()== "true"){
      var m=data.replaceAll('"','');
      }else{
      var m=data;
      }
    $('variant-radios .product-form__input').eq(1).find('[data-title]').each(function(d,i) {
      if ($.trim($(this).attr('data-title')) == $.trim(m)) {
  if(che1 != "undefined" && c1 == d){
      che1=$(this).find("input").val();
      $(this).find("input").attr("checked",true);
      $(this).find("input").trigger("click"); 
  }
      }
    });
  });
  
  
  
  $('variant-radios .product-form__input').eq(2).find('[data-title]').hide();
    selectedVar1 = $('variant-radios .product-form__input:first input:checked').val();
   selectedVar2 = $('variant-radios .product-form__input').eq(1).find('input:checked').val();
 
  productJson.variants.forEach(function(variant, index) {
    if (variant.options[0] == selectedVar1 && variant.options[1] == selectedVar2) {
      arrayPush.push(variant.options[2]);
    }
  });

  arrayPush.forEach(function(data, index) {
   if($("#quote1").val()== "true"){
      var m=data.replaceAll('"','');
      }else{
      var m=data;
      }
    $('variant-radios .product-form__input').eq(2).find('[data-title]').each(function(i,d) {
      if ($.trim($(this).attr('data-title')) == $.trim(m)) {
        $('[data-title="'+m+'"]').show();
        che = $(this).find("input:checked").val();
        if(c == 100){
        c=i; 
        }
      }
    });
  });
  
   
    arrayPush.forEach(function(data, index) {
  if($("#quote1").val()== "true"){
      var m=data.replaceAll('"','');
      }else{
      var m=data;
      }
    $('variant-radios .product-form__input').eq(2).find('[data-title]').each(function(d,i) {
      if ($.trim($(this).attr('data-title')) == $.trim(m)) {
    console.log(d);
  if(che != "undefined" && c == d){
      che=$(this).find("input").val();
      $(this).find("input").attr("checked",true);
      $(this).find("input").trigger("click"); 
  }
      }
    });
  });
 
   checkedSoldout();
});


$('variant-radios .product-form__input').eq(1).find('input').click(function() {
  var selectedVar1 = $('variant-radios .product-form__input:first input:checked').val();
  var selectedVar2 = $('variant-radios .product-form__input').eq(1).find('input:checked').val();
  
  const arrayPush = [];
  
  $('variant-radios .product-form__input').eq(2).find('[data-title]').hide();
  
  productJson.variants.forEach(function(variant, index) {
    if (variant.options[0] == selectedVar1 && variant.options[1] == selectedVar2) {
      arrayPush.push(variant.options[2]);
    }
  });
  
var che;
  var c=100;
  arrayPush.forEach(function(data, index) {
     if($("#quote1").val()== "true"){
     
      var m=data.replaceAll('"','');
      }else{
      var m=data;
      }
    $('variant-radios .product-form__input').eq(2).find('[data-title]').each(function(i,d) {
      if ($.trim($(this).attr('data-title')) == $.trim(m)) {
        $('[data-title="'+m+'"]').show();
       che = $(this).find("input:checked").val();
        if(c == 100){
        c=i; 
        }
      }
    });
  });
  
    arrayPush.forEach(function(data, index) {
      if($("#quote1").val() == "true"){
       
      var m=data.replaceAll('"','');
      }else{
      var m=data;
      }
    $('variant-radios .product-form__input').eq(2).find('[data-title]').each(function(d,i) {
      if ($.trim($(this).attr('data-title')) == $.trim(m)) {
   
  if(che != "undefined" && c == d){
      che=$(this).find("input").val();
      $(this).find("input").attr("checked",true);
      $(this).find("input").trigger("click"); 
  }
      }
    });
  });
 
  checkedSoldout();
});

}