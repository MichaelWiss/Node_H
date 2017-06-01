import axios from 'axios';

function ajaxHeart(e) {
   e.preventDefault();
   console.log('Heart it');
   axios
     .post(this.action)
     .then(res => {
         const isHearted = this.heart.classList.toggle('heart__button--hearted');
         console.log(isHearted);
     })
     .catch(console.error)
}

export default ajaxHeart