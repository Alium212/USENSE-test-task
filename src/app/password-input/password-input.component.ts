import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export enum PasswordStrength {
  GRAY = 'gray',
  RED = 'red',
  YELLOW = 'yellow',
  GREEN = 'green',
}

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class PasswordInputComponent implements OnInit {
  password: string = '';
  passwordStrength: PasswordStrength[] = [PasswordStrength.GRAY, PasswordStrength.GRAY, PasswordStrength.GRAY];

  private readonly constants = {
    PASSWORD_LENGTH_THRESHOLD: 8,
    PASSWORD_LENGTH_MIN: 0,
    DEFAULT_PASSWORD_STRENGTH_ARRAY: 3,
  };

  ngOnInit(): void {}

  private setPasswordStrength(strength: PasswordStrength[]): void {
    this.passwordStrength = strength;
  }

  private hasCharacterType(type: RegExp): boolean {
    return type.test(this.password);
  }

  private isPasswordLengthValid(): boolean {
    const length = this.password.length;

    if (length === this.constants.PASSWORD_LENGTH_MIN || length < this.constants.PASSWORD_LENGTH_THRESHOLD) {
      const newStrength = length === this.constants.PASSWORD_LENGTH_MIN
        ? PasswordStrength.GRAY
        : PasswordStrength.RED;
      this.setPasswordStrength(Array(this.constants.DEFAULT_PASSWORD_STRENGTH_ARRAY).fill(newStrength));
      return false;
    }

    return true;
  }

  private evaluatePasswordStrength(hasLetters: boolean, hasDigits: boolean, hasSymbols: boolean): PasswordStrength[] {
    if (hasLetters && hasDigits && hasSymbols) {
      return [PasswordStrength.GREEN, PasswordStrength.GREEN, PasswordStrength.GREEN];
    }
    if (hasLetters && (hasDigits || hasSymbols) || hasDigits && hasSymbols) {
      return [PasswordStrength.YELLOW, PasswordStrength.YELLOW, PasswordStrength.GRAY];
    }
    return [PasswordStrength.RED, PasswordStrength.GRAY, PasswordStrength.GRAY];
  }

  updatePasswordStrength(): void {
    if (!this.isPasswordLengthValid()) {
      return;
    }

    const hasLetters = this.hasCharacterType(/[a-zA-Z]/);
    const hasDigits = this.hasCharacterType(/\d/);
    const hasSymbols = this.hasCharacterType(/[!@#$%^&*(),.?":{}|<>]/);
    const newPasswordStrength = this.evaluatePasswordStrength(hasLetters, hasDigits, hasSymbols);

    this.setPasswordStrength(newPasswordStrength);
  }
}
