(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

let taxSwitch = document.getElementById("flexSwitchCheckDefault");
if (taxSwitch) { // Added this 'if' check to prevent errors on other pages
    taxSwitch.addEventListener("click", () => {
        let taxInfo = document.getElementsByClassName("tax-info");
        for (info of taxInfo) {
            if (info.style.display != "inline") {
                info.style.display = "inline";
            } else {
                info.style.display = "none";
            }
        }
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");
    const filtersContainer = document.getElementById("filters-container");
    
    // Check if these elements exist before adding listeners
    if(leftBtn && rightBtn && filtersContainer){
        const filterWidth = document.querySelector(".filter").offsetWidth + 32;

        leftBtn.addEventListener("click", function () {
            filtersContainer.scrollLeft -= filterWidth;
        });

        rightBtn.addEventListener("click", function () {
            filtersContainer.scrollLeft += filterWidth;
        });
    }

    const container = document.getElementById("filters-container");
    if(container){
        let startX;
        let scrollLeft;

        container.addEventListener("touchstart", (e) => {
            startX = e.touches[0].pageX;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener("touchmove", (e) => {
            const x = e.touches[0].pageX;
            const walk = startX - x;
            container.scrollLeft = scrollLeft + walk;
        });
    }
});


// Litepicker for Date Range (New Code)
document.addEventListener('DOMContentLoaded', () => {
    const checkinBtn = document.getElementById('checkin-btn');
    const checkinText = document.getElementById('checkin-text');
    const checkoutText = document.getElementById('checkout-text');

    if (checkinBtn) {
        const picker = new Litepicker({
            element: checkinBtn,
            singleMode: false,
            format: 'DD MMM',
            tooltipText: {
                one: 'night',
                other: 'nights'
            },
            setup: (picker) => {
                picker.on('selected', (date1, date2) => {
                    if (date1 && date2) {
                        checkinText.innerText = picker.getStartDate().format('DD MMM');
                        checkoutText.innerText = picker.getEndDate().format('DD MMM');
                    } else {
                        checkinText.innerText = 'Add dates';
                        checkoutText.innerText = 'Add dates';
                    }
                });
            }
        });
    }
});



// Guest Counter Functionality 
document.addEventListener('DOMContentLoaded', () => {
    const whoBtn = document.getElementById('who-btn');
    const whoText = document.getElementById('who-text');
    const guestPopover = document.getElementById('guest-popover');
    
    if (whoBtn && guestPopover) {
        // Show/hide the popover when the 'Who' button is clicked
        whoBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents the 'document' click from firing immediately
            guestPopover.classList.toggle('show');
        });

        // CORRECTED: Handle clicks on the counter buttons more robustly
        guestPopover.addEventListener('click', (event) => {
            event.stopPropagation();
            const button = event.target.closest('.counter-btn'); // Use .closest() to find the button
            if (button) {
                const action = button.dataset.action;
                const target = button.dataset.target;
                const countElement = document.getElementById(`${target}-count`);
                let currentValue = parseInt(countElement.innerText);

                if (action === 'increment') {
                    currentValue++;
                } else if (action === 'decrement' && currentValue > 0) {
                    currentValue--;
                }
                
                // Disable the minus button when the count is 0
                const decrementBtn = button.parentElement.querySelector('[data-action="decrement"]');
                if(decrementBtn) {
                    decrementBtn.disabled = (currentValue === 0);
                }

                countElement.innerText = currentValue;
                updateGuestText();
            }
        });

        // Function to update the main search bar text
        function updateGuestText() {
            const adults = parseInt(document.getElementById('adults-count').innerText);
            const children = parseInt(document.getElementById('children-count').innerText);
            const infants = parseInt(document.getElementById('infants-count').innerText);

            const totalGuests = adults + children;
            let guestString = '';

            if (totalGuests > 0) {
                guestString = `${totalGuests} guest${totalGuests > 1 ? 's' : ''}`;
            }
            if (infants > 0) {
                guestString += `${guestString ? ', ' : ''}${infants} infant${infants > 1 ? 's' : ''}`;
            }

            if (guestString) {
                whoText.innerText = guestString;
                whoText.style.color = '#222'; // Make text darker when there are guests
            } else {
                whoText.innerText = 'Add guests';
                whoText.style.color = '#717171'; // Reset to placeholder color
            }
        }

        // Close the popover if the user clicks outside of it
        document.addEventListener('click', (event) => {
            if (guestPopover.classList.contains('show') && !whoBtn.contains(event.target)) {
                guestPopover.classList.remove('show');
            }
        });
    }
});