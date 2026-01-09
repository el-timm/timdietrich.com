/**
 * Beta Signup Modal and Form Submission
 * Email obfuscation to prevent scraping
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    function initBetaSignup() {
        const betaSignupBtn = document.getElementById('beta-signup-btn');
        const betaSignupBtnHero = document.getElementById('beta-signup-btn-hero');
        const betaModal = document.getElementById('beta-modal');
        const betaModalClose = document.querySelector('.beta-modal-close');
        const betaSignupForm = document.getElementById('beta-signup-form');
        const betaFormSuccess = document.getElementById('beta-form-success');

        if (!betaModal) {
            console.warn('Beta modal not found');
            return;
        }

        // Function to open modal
        function openModal() {
            betaModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        // Function to close modal
        function closeModal() {
            betaModal.style.display = 'none';
            document.body.style.overflow = '';
            // Reset form state if needed
            if (betaSignupForm) {
                betaSignupForm.style.display = 'block';
            }
            if (betaFormSuccess) {
                betaFormSuccess.style.display = 'none';
            }
        }

        // Open modal from either button
        if (betaSignupBtn) {
            betaSignupBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        }

        if (betaSignupBtnHero) {
            betaSignupBtnHero.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        }

        // Close modal button
        if (betaModalClose) {
            betaModalClose.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
            });
        }

        // Close modal when clicking outside
        betaModal.addEventListener('click', (e) => {
            if (e.target === betaModal) {
                closeModal();
            }
        });

        // Close modal with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && betaModal.style.display === 'flex') {
                closeModal();
            }
        });

        // Form submission with obfuscated email
        if (betaSignupForm) {
            betaSignupForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const formData = new FormData(this);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message') || 'No message provided';

                // Obfuscate email address - split into parts
                const emailParts = {
                    u: 'timdietrich',
                    d: 'gmail',
                    t: 'com'
                };

                // Construct email address
                const recipientEmail = emailParts.u + '@' + emailParts.d + '.' + emailParts.t;

                // Create mailto link with subject and body
                const subject = encodeURIComponent('Beta Access Request - I\'m the Commish');
                const body = encodeURIComponent(
                    `Name: ${name}\n` +
                    `Email: ${email}\n\n` +
                    `Message:\n${message}`
                );

                // Open email client
                window.location.href = 'mail' + 'to:' + recipientEmail + '?subject=' + subject + '&body=' + body;

                // Hide form and show success message
                if (betaSignupForm) {
                    betaSignupForm.style.display = 'none';
                }
                if (betaFormSuccess) {
                    betaFormSuccess.style.display = 'block';
                }

                // Reset form
                this.reset();

                // Close modal after 3 seconds
                setTimeout(() => {
                    closeModal();
                }, 3000);
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBetaSignup);
    } else {
        // DOM is already ready
        initBetaSignup();
    }

})();

