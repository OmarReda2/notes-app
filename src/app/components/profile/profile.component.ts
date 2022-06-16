import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';
import jwt_decode from 'jwt-decode'
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {




  constructor(private _Router: Router, private _NotesService: NotesService) {
    try {
      this.token = localStorage.getItem('token');
      let decoded: any = jwt_decode(this.token || "");
      this.getAllNotes();


    } catch (error) {
      localStorage.clear()
      _Router.navigate(['/signin'])
    }
  }







  // ================================== change css ======================================
  isOptionShown: boolean = false;
  changeColorLabel: boolean = false;
  NOTE_ID2: any;


  ExactNote(id: any) {
    if (id == this.NOTE_ID2) {
      return true;
    } else {
      return false;
    }
  }

  hideOptions(id: any) {

    if ($('.dropdown-menu.show').css('display') != 'block') {
      this.isOptionShown = false
    } else {
      this.isOptionShown = true
    }
  }

  showOptions(id: any) {

    this.isOptionShown = true
    $('.options').css({
      opacity: '1',
    })

  }

  showIconsInfo(num: string) {
    $(`.icons-info-${num}`).css({
      display: 'block'

    })

    if ($('.dropdown-menu.show').css('display') == 'block') {
      $(`.icons-info-3`).css({
        display: 'none'
      })
    }

  }


  hideIconsInfo(num: string) {
    $(`.icons-info-${num}`).css({
      display: 'none'
    })
  }


  hideChangeColorLabel() {
    $(`.icons-info-3`).css({
      display: 'none'
    })
  }

 


  // ================================== /change css ======================================


  token = localStorage.getItem('token');
  decoded: any = jwt_decode(this.token || "");
  allNotes: any;
  isLoad: boolean = false;
  isAdded: boolean = false;
  isDeleted: boolean = false;


  getAllNotes() {

    let data = {
      token: this.token,
      userID: this.decoded._Id
    }



    this._NotesService.getAllNotes(data).subscribe({
      next: (res) => {
        if (res.message = 'success') {
          this.isLoad = true;
          this.allNotes = res.Notes;
        } else {
          localStorage.clear();
          this._Router.navigate(['signin'])
        }
      }
    })
  }



  AddNote = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required)
  })



  resetForm() {
    this.AddNote.reset()
  }





  addData() {
    this.isAdded = true;
    let data = {
      title: this.AddNote.value.title,
      desc: this.AddNote.value.desc,
      token: this.token,
      citizenID: this.decoded._Id
    }

    this._NotesService.addNote(data).subscribe({
      next: (res) => {
        this.isAdded = false;
        if (res.message == 'success') {
          $('#AddNote').modal('hide')
          this.getAllNotes()
          this.AddNote.reset()
          $(window).scrollTop($(document).height())

        }
      }
    })
  }


  // ================================== delete Note ======================================
  NOTE_ID: any;

  getID(id: any) {
    this.NOTE_ID = id
  }

  deleteNote() {
    this.isDeleted = true;
    let data = {
      token: this.token,
      NoteID: this.NOTE_ID
    }

    this._NotesService.deleteNote(data).subscribe({
      next: (res) => {
        this.isDeleted = false
        if (res.message == 'deleted') {
          $('#DeleteNote').modal('hide')
          this.getAllNotes()
        }
      }
    })
  }

  deleteAll() {
    this.isDeleted = true
    for (let index = 0; index < this.allNotes.length; index++) {
      let data = {
        token: this.token,
        NoteID: this.allNotes[index]
      }

      this._NotesService.deleteNote(data).subscribe({
        next: (res) => {
          this.isDeleted = false;
          this.getAllNotes()
          $('#DeleteAll').modal('hide')
        }
      })
    }
  }


  // ================================== Edite Note ======================================
  title: any;
  desc: any;
  isUpdated: boolean = false;

  setValue() {
    for (let index = 0; index < this.allNotes.length; index++) {
      if (this.allNotes[index]._id == this.NOTE_ID) {
        this.title = this.allNotes[index].title;
        this.desc = this.allNotes[index].desc
        this.AddNote.controls['title'].setValue(this.title)
        this.AddNote.controls['desc'].setValue(this.desc)
      }
    }
  }

  

  currentUpdated = null
  data: any

  editNote() {
    this.data = {
      title: this.AddNote.value.title,
      desc: this.AddNote.value.desc,
      NoteID: this.NOTE_ID,
      token: this.token
    }

    this.currentUpdated = this.data.NoteID
    $('#EditNote').modal('hide');
    this.isUpdated = true;
      

      this._NotesService.UpdateNote(this.data).subscribe({
        next: (res) => {
          this.AddNote.controls['title'].setValue(this.data.title);
          this.AddNote.controls['desc'].setValue(this.data.desc);

          if (res.message == 'updated') {
            this.getAllNotes();
            this.isUpdated = false;
            // this.resetForm()
          }
        }
      })
  }
  
  ngOnInit(): void {}
}