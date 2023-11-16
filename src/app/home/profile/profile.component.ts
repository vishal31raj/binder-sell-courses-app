import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDetails = {
    imageUrl: '../../../assets/images/Pic1.jpg',
    displayName: 'Vishal',
    firstName: 'Vishal',
    lastName: 'Raj',
    about:
      "I'm front-end developer with a strong background in web and mobile app development and a passion for creating beautiful and functional applications. I'm skilled in a wide range of technologies and frameworks, and able to deliver high performance, scalable systems.",
    areaOfInterest: {
      options: ['Coding', 'Cooking', 'Football'],
      selectedOptions: ['Coding']
    },
    isProfessional: true,
    experience: {
      options: ['0-5', '5-10', '10 & above'],
      selectedOption: '0-5'
    },
    expertise: {
      options: ['Backend', 'Frontend'],
      selectedOption: 'Frontend'
    },
    role: ''
  };

  constructor() {}

  ngOnInit(): void {}
}
