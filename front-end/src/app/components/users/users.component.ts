import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  avatar: string;
  online: boolean;
}


@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent {
  users: User[] = [
    {
      name: 'Radouane',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      online: false
    },
    {
      name: 'Amine',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      online: true
    },
    {
      name: 'Sofia',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      online: false
    },
    {
      name: 'Rachid',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      online: true
    },
    {
      name: 'Lina',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      online: true
    },
    {
      name: 'Radouane',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      online: false
    },
    {
      name: 'Amine',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      online: true
    },
    {
      name: 'Sofia',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      online: false
    },
    {
      name: 'Rachid',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      online: true
    },
    {
      name: 'Lina',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      online: true
    },
    {
      name: 'Radouane',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      online: false
    },
    {
      name: 'Amine',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      online: true
    },
    {
      name: 'Sofia',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      online: false
    },
    {
      name: 'Rachid',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      online: true
    },
    {
      name: 'Lina',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      online: true
    },
    {
      name: 'Radouane',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      online: false
    },
    {
      name: 'Amine',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      online: true
    },
    {
      name: 'Sofia',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      online: false
    },
    {
      name: 'Rachid',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      online: true
    },
    {
      name: 'Lina',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      online: true
    }
  ];
}