import { Component } from '@angular/core';

@Component({
  selector: 'app-companyprofile',
  imports: [],
  templateUrl: './companyprofile.component.html',
  styleUrl: './companyprofile.component.css'
})
export class CompanyprofileComponent {
  ngAfterViewInit() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(this: HTMLElement, e: Event) {
        e.preventDefault();
        navLinks.forEach(nl => nl.classList.remove('active'));
        this.classList.add('active');
        sections.forEach(section => (section as HTMLElement).style.display = 'none');
        const targetId = this.getAttribute('href')?.substring(1);
        const targetSection = document.getElementById(targetId!);
        if (targetSection) targetSection.style.display = 'block';
      });
    });

    sections.forEach((section, index) => {
      (section as HTMLElement).style.display = index === 0 ? 'block' : 'none';
    });

    // Upload functionality
    const uploadBoxes = document.querySelectorAll('.upload-box');
    uploadBoxes.forEach(box => {
      box.addEventListener('click', function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';

        input.addEventListener('change', function (e: any) {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function (e: any) {
              const placeholder = box.querySelector('.upload-placeholder');
              if (placeholder) {
                placeholder.innerHTML = `
                  <img src="${e.target.result}" alt="Uploaded image" style="max-width: 100%; max-height: 100px; border-radius: 8px;">
                  <p>Image uploaded successfully</p>
                  <small>Click to change</small>
                `;
              }
            };
            reader.readAsDataURL(file);
          }
        });

        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
      });
    });

    // Form validation
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
      input.addEventListener('blur', function () {
        if (input.hasAttribute('required') && !(input as HTMLInputElement).value.trim()) {
          (input as HTMLInputElement).style.borderColor = 'var(--error)';
        } else {
          (input as HTMLInputElement).style.borderColor = 'var(--neutral-300)';
        }
      });
    });

    // Search
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        console.log('Searching for:', searchTerm);
      });
    }

    // Job filter
    const jobFilters = document.querySelectorAll('.job-filters select');
    jobFilters.forEach(filter => {
      filter.addEventListener('change', function (this: HTMLSelectElement) {
        const filterValue = this.value;
        const jobItems = document.querySelectorAll('.job-item');
        jobItems.forEach(item => {
          const status = item.querySelector('.status');
          if (
            filterValue === 'All Jobs' ||
            (filterValue === 'Active' && status?.classList.contains('active')) ||
            (filterValue === 'Expired' && status?.classList.contains('expired'))
          ) {
            (item as HTMLElement).style.display = 'flex';
          } else {
            (item as HTMLElement).style.display = 'none';
          }
        });
      });
    });

    // Button feedback
    document.addEventListener('click', function (e: any) {
      if (e.target.matches('.btn')) {
        const button = e.target;
        const originalText = button.textContent;

        button.style.opacity = '0.7';
        button.style.pointerEvents = 'none';

        setTimeout(() => {
          button.style.opacity = '1';
          button.style.pointerEvents = 'auto';

          if (originalText.includes('Save') || originalText.includes('Update')) {
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Changes saved successfully!';
            successMessage.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              background: var(--success);
              color: white;
              padding: 12px 24px;
              border-radius: 8px;
              box-shadow: var(--shadow-lg);
              z-index: 1000;
              animation: slideIn 0.3s ease;
            `;
            document.body.appendChild(successMessage);
            setTimeout(() => successMessage.remove(), 3000);
          }
        }, 1000);
      }
    });

    // Animation keyframe
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    // Auto-save inputs
    const autoSaveInputs = document.querySelectorAll('input, textarea, select');
    autoSaveInputs.forEach(input => {
      let timeout: any;
      input.addEventListener('input', function (this: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          console.log('Auto-saving:', this.name || this.id, this.value);
        }, 2000);
      });
    });

    // Responsive menu
    const createMobileMenu = () => {
      const nav = document.querySelector('.nav');
      if (!nav) return;
      if (window.innerWidth <= 768) {
        if (!nav.classList.contains('mobile-nav')) {
          nav.classList.add('mobile-nav');
          (nav as HTMLElement).style.flexDirection = 'column';
          (nav as HTMLElement).style.gap = 'var(--space-2)';
        }
      } else {
        if (nav.classList.contains('mobile-nav')) {
          nav.classList.remove('mobile-nav');
          (nav as HTMLElement).style.flexDirection = 'row';
          (nav as HTMLElement).style.gap = 'var(--space-8)';
        }
      }
    };
    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();
  }

}
