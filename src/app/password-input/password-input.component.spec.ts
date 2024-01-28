import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordInputComponent, PasswordStrength } from './password-input.component';

describe('PasswordInputComponent', () => {
  let component: PasswordInputComponent;
  let fixture: ComponentFixture<PasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.password).toBe('');
    expect(component.passwordStrength).toEqual([
      PasswordStrength.GRAY,
      PasswordStrength.GRAY,
      PasswordStrength.GRAY,
    ]);
  });

  it('should update password strength for a weak password', () => {
    // Set a less than 8 password
    component.password = 'abc';
    component.updatePasswordStrength();
    expect(component.passwordStrength).toEqual([
      PasswordStrength.RED,
      PasswordStrength.RED,
      PasswordStrength.RED,
    ]);
  });

  it('should update password strength for a medium strength password', () => {
    // Set a medium strength password
    component.password = 'Abcd1234';
    component.updatePasswordStrength();
    expect(component.passwordStrength).toEqual([
      PasswordStrength.YELLOW,
      PasswordStrength.YELLOW,
      PasswordStrength.GRAY,
    ]);
  });

  it('should update password strength for a strong password', () => {
    // Set a strong password
    component.password = 'Strong!123';
    component.updatePasswordStrength();
    expect(component.passwordStrength).toEqual([
      PasswordStrength.GREEN,
      PasswordStrength.GREEN,
      PasswordStrength.GREEN,
    ]);
  });

  it('should not update password strength for an invalid password length', () => {
    // Set an invalid password length
    component.password = '';
    component.updatePasswordStrength();
    expect(component.passwordStrength).toEqual([
      PasswordStrength.GRAY,
      PasswordStrength.GRAY,
      PasswordStrength.GRAY,
    ]);
  });

  it('should handle different character types correctly', () => {
    // Set a password with only letters
    component.password = 'OnlyLetters';
    component.updatePasswordStrength();
    expect(component.passwordStrength).toEqual([
      PasswordStrength.RED,
      PasswordStrength.GRAY,
      PasswordStrength.GRAY,
    ]);

    // Set a password with only digits
    component.password = '123456789';
    component.updatePasswordStrength();
    expect(component.passwordStrength).toEqual([
      PasswordStrength.RED,
      PasswordStrength.GRAY,
      PasswordStrength.GRAY,
    ]);

    // Set a password with only symbols
    component.password = '!@#$%^&*';
    component.updatePasswordStrength();
    expect(component.passwordStrength).toEqual([
      PasswordStrength.RED,
      PasswordStrength.GRAY,
      PasswordStrength.GRAY,
    ]);
  });
});
