import { Component, InputSignal,input,Output,EventEmitter, output ,Input,signal,Signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-serch-bar',
  imports: [
    FormsModule ],
  templateUrl: './serch-bar.component.html',
  styleUrl: './serch-bar.component.css'
})
export class SerchBarComponent {
  @Output() serchBar=new EventEmitter<string>();
  @Input() search:string  = 'Initial';
  data :Signal<string>=signal("");
  varNB:number=0;
  count:InputSignal<number>=input(0, {
		alias: "my-counter",
	})

  serch(e:Event){
    const value =(e.target as HTMLInputElement).value ;
    this.serchBar.emit(this.data())
  }






}
