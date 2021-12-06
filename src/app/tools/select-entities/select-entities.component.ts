import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EntityType} from '../../interfaces/types/entity-type';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Article} from '../../interfaces/article.interface';
import {Category} from '../../interfaces/category.interface';
import {Department} from '../../interfaces/department.interface';
import {Contact} from '../../interfaces/contact.interface';
import {Investition} from '../../interfaces/investition.interface';
import {Office} from '../../interfaces/office.interface';
import {Variant} from '../../interfaces/variant.interface';
import {EntityService} from './entity.service';
import {map, mergeMap, startWith} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Page} from '../../interfaces/page.interface';
import {Popup} from '../../interfaces/popup.interface';
import {environment} from '../../../environments/environment';

export type EntitiesOutputFormat = 'one' | 'many';
export type ChangeStrategy = 'auto' | 'manual';

@Component({
  selector: 'app-select-entities',
  templateUrl: './select-entities.component.html',
  styleUrls: ['./select-entities.component.scss']
})
export class SelectEntitiesComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() outputFormat: EntitiesOutputFormat = 'one';
  @Input() model: EntityType;
  @Input() nameKey: string;
  @Input() customKey: string;
  @Input() entityIds: number[] = [];
  @Input() changeStrategy: ChangeStrategy = 'auto';
  @Input() withImage?: boolean = false;
  @Output() onChange: EventEmitter<number[] | number> = new EventEmitter<number[] | number>();
  @Output() onManualClick: EventEmitter<number[] | number> = new EventEmitter<number[] | number>();

  searchForm: FormGroup;
  ids$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  entities$: Observable<(Article|Category|Department|Contact|Investition|Office|Variant|Page)[]>;
  entitiesAdded$: Observable<(Article|Category|Department|Contact|Investition|Office|Variant|Page)[]>;
  phrase$: Observable<string>;
  webUrl: string = environment.WEB_URL;
  isLoading$: Observable<boolean>;

  private entitiesFilter = <T extends { id?: number}>(ids) => {
    return this.entityService.all<T>(this.model).pipe(map(ent => {
      const list = ent.filter(en => {
        let bool = true;
        ids.forEach(id => {
          if (en.id === id) {
            bool = false;
          }
        });
        return bool;
      });
      this.isLoading$ = of(false);
      return list;
    }));
  }

  private entitiesAddedFilter = <T extends { id?: number}>(ids) => {
    return this.entityService.all<T>(this.model).pipe(map(ent => {
        const list = [];
        ids.forEach(id => {
          ent.forEach(en => {
            if (en.id === id) {
              list.push(en);
            }
          });
        });
        return list;
    }));
  }

  constructor(private entityService: EntityService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.phrase$ = this.onPhraseChange();
    this.isLoading$ = of(true);
    this.delegateToEntity();
  }

  createForm(): void{
    this.searchForm = this.fb.group({
      phrase: ['']
    });
  }

  onPhraseChange(): Observable<string>{
    return this.searchForm.get('phrase').valueChanges.pipe(startWith(''));
  }

  ngAfterViewInit(): void {
    // this.ids$.next(this.entityIds);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ids$.next(this.entityIds);
  }

  add(id: number): void{
    switch (this.outputFormat) {
      case 'one':
        this.entityIds = [id];
        break;
      case 'many':
        this.entityIds.push(id);
        break;
    }
    this.ids$.next(this.entityIds);
    this.pushOut();
  }

  remove(i: number): void {
    switch (this.outputFormat) {
      case 'one':
        this.entityIds = [];
        break;
      case 'many':
        this.entityIds.splice(i, 1);
        break;
    }
    this.ids$.next(this.entityIds);
    this.pushOut();
  }

  delegateToEntity(): void {
    switch (this.model) {
      case 'article':
        this.entities$ = this.ids$.pipe(mergeMap(ids => this.entitiesFilter<Article>(ids)), mergeMap(entities => {
          return this.phrase$.pipe(map(value => {
            return entities.filter(ent => {
              return ent[this.nameKey].indexOf(value) !== -1 || value === '';
            });
          }));
        }));
        this.entitiesAdded$ = this.ids$.pipe(mergeMap(ids => this.entitiesAddedFilter<Article>(ids)));
        break;
      case 'category':
        this.entities$ = this.ids$.pipe(mergeMap(ids => this.entitiesFilter<Category>(ids)), mergeMap(entities => {
          return this.phrase$.pipe(map(value => {
            return entities.filter(ent => {
              return ent[this.nameKey].indexOf(value) !== -1 || value === '';
            });
          }));
        }));
        this.entitiesAdded$ = this.ids$.pipe(mergeMap(ids => this.entitiesAddedFilter<Category>(ids)));
        break;
      case 'department':
        this.entities$ = this.ids$.pipe(mergeMap(ids => this.entitiesFilter<Department>(ids)), mergeMap(entities => {
          return this.phrase$.pipe(map(value => {
            return entities.filter(ent => {
              return ent[this.nameKey].indexOf(value) !== -1 || value === '';
            });
          }));
        }));
        this.entitiesAdded$ = this.ids$.pipe(mergeMap(ids => this.entitiesAddedFilter<Department>(ids)));
        break;
      case 'contact':
        this.entities$ = this.ids$.pipe(mergeMap(ids => this.entitiesFilter<Contact>(ids)), mergeMap(entities => {
          return this.phrase$.pipe(map(value => {
            return entities.filter(ent => {
              return ent[this.nameKey].indexOf(value) !== -1 || value === '';
            });
          }));
        }));
        this.entitiesAdded$ = this.ids$.pipe(mergeMap(ids => this.entitiesAddedFilter<Contact>(ids)));
        break;
      case 'investition':
        this.entities$ = this.ids$.pipe(mergeMap(ids => this.entitiesFilter<Investition>(ids)), mergeMap(entities => {
          return this.phrase$.pipe(map(value => {
            return entities.filter(ent => {
              return ent[this.nameKey].indexOf(value) !== -1 || value === '';
            });
          }));
        }));
        this.entitiesAdded$ = this.ids$.pipe(mergeMap(ids => this.entitiesAddedFilter<Investition>(ids)));
        break;
      case 'office':
        this.entities$ = this.ids$.pipe(mergeMap(ids => this.entitiesFilter<Office>(ids)), mergeMap(entities => {
          return this.phrase$.pipe(map(value => {
            return entities.filter(ent => {
              return ent[this.nameKey].indexOf(value) !== -1 || value === '';
            });
          }));
        }));
        this.entitiesAdded$ = this.ids$.pipe(mergeMap(ids => this.entitiesAddedFilter<Office>(ids)));
        break;
      case 'variant':
        this.entities$ = this.ids$.pipe(mergeMap(ids => this.entitiesFilter<Variant>(ids)), mergeMap(entities => {
          return this.phrase$.pipe(map(value => {
            return entities.filter(ent => {
              return ent[this.nameKey].indexOf(value) !== -1 || value === '';
            });
          }));
        }));
        this.entitiesAdded$ = this.ids$.pipe(mergeMap(ids => this.entitiesAddedFilter<Variant>(ids)));
        break;
      case 'page':
        this.entities$ = this.ids$.pipe(mergeMap(ids => this.entitiesFilter<Page>(ids)), mergeMap(entities => {
          return this.phrase$.pipe(map(value => {
            return entities.filter(ent => {
              return ent[this.nameKey].indexOf(value) !== -1 || value === '';
            });
          }));
        }));
        this.entitiesAdded$ = this.ids$.pipe(mergeMap(ids => this.entitiesAddedFilter<Page>(ids)));
        break;
      case 'popup':
        this.entities$ = this.ids$.pipe(mergeMap(ids => this.entitiesFilter<Popup>(ids)), mergeMap(entities => {
          return this.phrase$.pipe(map(value => {
            return entities.filter(ent => {
              return ent[this.nameKey].indexOf(value) !== -1 || value === '';
            });
          }));
        }));
        this.entitiesAdded$ = this.ids$.pipe(mergeMap(ids => this.entitiesAddedFilter<Popup>(ids)));
        break;
    }
  }

  pushOut(): void {
    switch (this.outputFormat) {
      case 'one':
        this.onChange.emit((this.entityIds.length) ? this.entityIds[0] : null);
        break;
      case 'many':
        this.onChange.emit(this.entityIds);
        break;
    }
  }

  acceptChange(): void {
    switch (this.outputFormat) {
      case 'one':
        this.onManualClick.emit((this.entityIds.length) ? this.entityIds[0] : null);
        break;
      case 'many':
        this.onManualClick.emit(this.entityIds);
        break;
    }
  }


}
