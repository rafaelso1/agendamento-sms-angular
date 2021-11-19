import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SmsScheduler } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SmsScheduler
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SmsScheduler);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'sms-scheduler'`, () => {
    const fixture = TestBed.createComponent(SmsScheduler);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('sms-scheduler');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SmsScheduler);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('sms-scheduler app is running!');
  });
});
