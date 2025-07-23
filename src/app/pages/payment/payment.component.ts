import { Component, OnInit, ViewChild } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
})
export class PaymentComponent implements OnInit {
  stripe: Stripe | null = null;
  cardElement!: StripeCardElement;
  loading = false;
  amount = 0; 
  applicationId!: string; 
  successMessage = '';
  errorMessage = '';
  application: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.applicationId = this.route.snapshot.params['id'];
    this.http.get(`http://localhost:8000/api/company/jobs/applications/${this.applicationId}`).subscribe((res: any) => {
      this.application = res.data;
      this.amount = this.application.min_price;
    });
  }

  async ngOnInit() {
    this.stripe = await loadStripe(environment.stripePublicKey);

    const elements = this.stripe!.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
  }

  async handlePayment() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { paymentMethod, error } = await this.stripe!.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });

    if (error) {
      this.errorMessage = error.message ?? 'payment failed';
      this.loading = false;
      return;
    }

    // إرسال إلى Laravel
    this.http
      .post(`${environment.apiUrl}/pay`, {
        amount: this.amount,
        application_id: this.applicationId,
        payment_method_id: paymentMethod.id,
      })
      .subscribe({
        next: (res: any) => {
          this.successMessage = 'payment success';
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'payment failed';
          this.loading = false;
        },
      });
  }
}
