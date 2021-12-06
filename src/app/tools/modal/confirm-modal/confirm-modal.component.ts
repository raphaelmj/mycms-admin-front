import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter, Inject,
    Input,
    NgModule,
    Output,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ConfirmDataOut {
    isConfirm: boolean;
    data?: unknown;
}

export interface ConfirmConfig {
    message?: string;
    yesText?: string;
    noText?: string;
    data?: unknown;
}

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements AfterViewInit {
    @Input() config: ConfirmConfig;
    @Output() onClose: EventEmitter<undefined> = new EventEmitter<undefined>();
    @Output() onChoose: EventEmitter<ConfirmDataOut> = new EventEmitter<ConfirmDataOut>();
    @ViewChild('modalBody') modalBody: ElementRef;

    constructor(
        private elementRef: ElementRef,
        private renderer2: Renderer2,
        private window: Window
    ) {}

    ngAfterViewInit(): void {
        const modalHeight: number = (this.modalBody.nativeElement as HTMLDivElement).offsetHeight;
        const windowHeight: number = this.window.innerHeight;
        const top: number = (windowHeight - modalHeight) / 2;

        (this.modalBody.nativeElement as HTMLDivElement).style.top = `${top}px`;
    }

    get yesText(): string {
        return (this.config.yesText) ? this.config.yesText : 'Tak';
    }

    get noText(): string {
        return (this.config.yesText) ? this.config.yesText : 'Nie';
    }

    choose(isConfirm: boolean): void {
        this.onChoose.emit({
            isConfirm,
            data: this.config.data,
        });
    }

    close(): void {
        this.onClose.emit();
    }
}

@NgModule({
    declarations: [
        ConfirmModalComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        ConfirmModalComponent,
    ],
})
export class ConfirmModalComponentModule {}
