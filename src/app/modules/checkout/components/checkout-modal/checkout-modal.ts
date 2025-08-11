import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

type ModalStatus = 'idle' | 'processing' | 'success';

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-modal.html',
  styleUrls: ['./checkout-modal.scss']
})
export class CheckoutModalComponent {
  @Output() onConfirm = new EventEmitter<void>();
  
  isVisible = false;
  status: ModalStatus = 'idle';

  // Método para iniciar el proceso desde el componente padre
  startProcess(): void {
    this.isVisible = true;
    this.status = 'processing';

    // Simula el tiempo de procesamiento del pago
    setTimeout(() => {
      this.status = 'success';
    }, 2500); // 2.5 segundos de simulación
  }

  // Cierra el modal y emite el evento de confirmación
  confirmAndClose(): void {
    this.isVisible = false;
    this.onConfirm.emit();
    
    // Resetea el estado para la próxima vez
    setTimeout(() => {
      this.status = 'idle';
    }, 500);
  }
}