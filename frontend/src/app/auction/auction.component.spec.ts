import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuctionComponent } from './auction.component';

describe('AuctionComponent', () => {
  let component: AuctionComponent;
  let fixture: ComponentFixture<AuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a book defined', () => {
    expect(component.book).toBeDefined();
  });

  it('should display the book title in the template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Auction for Esempio di Libro');
  });

  it('should display the book image in the template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('img').src).toContain('assets/copertine/example.jpg');
  });

  it('should display the current bid in the template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Current Bid: $22.50');
  });
});
