import { DataFilterPipe } from './filterQuery.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { VideoSanitizerPipe } from './video-sanitizer.pipe';
@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [
    DataFilterPipe,
    DateFormatPipe,
    VideoSanitizerPipe
  ],
  exports: [
    DataFilterPipe,
    VideoSanitizerPipe
  ]
})
export class ApplicationPipesModule {}
