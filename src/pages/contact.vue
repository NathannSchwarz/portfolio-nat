<script setup lang="ts">
import { reactive, ref } from 'vue';
import emailjs from 'emailjs-com';
import FleurBleu from "@/components/icons/FleurBleu.vue";
import FleurRouge from "@/components/icons/FleurRouge.vue";
import FleurPleineRouge from "@/components/icons/FleurPleineRouge.vue";
import FleurPleineYellow from "@/components/icons/FleurPleineYellow.vue";
import IconWhite from "@/components/icons/IconWhite.vue";

const whatDoYouNeedOptions = ['BRANDING', 'WEB SITE', 'GRAPHIC DESIGN', 'OTHER'];
const whereDidYouHearOptions = ['SOCIAL MEDIA', 'FRIEND', 'GOOGLE', 'OTHER'];

const selected = reactive({
      whatDoYouNeed: [] as string[],
      whereDidYouHear: [] as string[],
});

const formData = reactive({
      deadline: '',
      budget: '',
      name: '',
      company: '',
      enquiryType: '',
      message: '',
});

const errors = reactive({
      deadline: false,
      budget: false,
      name: false,
      company: false,
      enquiryType: false,
      message: false,
      whatDoYouNeed: false,
      whereDidYouHear: false,
});

const formSubmitted = ref(false);

const toggleSelection = (category: 'whatDoYouNeed' | 'whereDidYouHear', option: string) => {
      if (selected[category].includes(option)) {
        selected[category] = selected[category].filter((item) => item !== option);
      } else {
        selected[category] = [...selected[category], option];
      }
};

const validateForm = () => {
      errors.deadline = !formData.deadline;
      errors.budget = !formData.budget;
      errors.name = !formData.name;
      errors.company = !formData.company;
      errors.enquiryType = !formData.enquiryType;
      errors.message = !formData.message;
      errors.whatDoYouNeed = selected.whatDoYouNeed.length === 0;
      errors.whereDidYouHear = selected.whereDidYouHear.length === 0;

      // If all fields are valid, return true
      return !Object.values(errors).includes(true);
};

const submitForm = async () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (validateForm()) {
        const templateParams = {
          whatDoYouNeed: selected.whatDoYouNeed.join(', '),
          whereDidYouHear: selected.whereDidYouHear.join(', '),
          deadline: formData.deadline,
          budget: formData.budget,
          name: formData.name,
          company: formData.company,
          enquiryType: formData.enquiryType,
          message: formData.message,
        };

        try {
          await emailjs.send(
            'service_hzbrzie', // Your EmailJS service ID
            'template_krgmlk4', // Replace with your EmailJS template ID
            templateParams,
            'tYitGWe_Aq6TJD53H' // Your EmailJS public key
          );
          formSubmitted.value = true;
        } catch (error) {
          console.error('Failed to send email:', error);
          alert('Failed to send email. Please try again.');
        }
      } else {
        const firstErrorField = document.querySelector('.error') as HTMLElement;
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
</script>

<template>
  <section class="relative bg-colowhite pb-32 overflow-hidden">
    <div>
    <!-- Fleurs avec animation -->
     <FleurRouge
      alt="FleurRouge"
      class="absolute top-24 left-2 w-[16vw] z-0 md:top-32 md:left-10 md:w-[14vw] lg:left-20 animate-spin-slow-20"/>

      <FleurPleineYellow alt="FleurYellow"
      class="absolute top-0 right-8 w-[18vw] z-0 md:right-20 md:w-[16vw] lg:right-32 animate-spin-reverse-slow"/>

    <transition name="fade">
       <FleurBleu v-if="!formSubmitted"
          alt="FleurBleu"
          class="absolute top-[25rem] right-0 w-[16vw] z-0 md:-right-10 md:w-[14vw] lg:-right-20 lg:top-[40rem] animate-spin-reverse"/>

      </transition>
    <!-- Fleur Jaune -->
      <transition name="fade">
        <FleurPleineYellow
        v-if="!formSubmitted"
        alt="FleurYellow"
          class="absolute top-[35rem] -left-6 w-[18vw] z-0 md:-left-14 md:top-[40rem] md:w-[16vw] lg:right-32 lg:top-[50rem] animate-spin-slow"/>
      </transition>

      <!-- Fleur Rouge -->
      <transition name="fade">
        <FleurPleineRouge
        v-if="!formSubmitted"
          alt="FleurRouge"
          class="absolute bottom-10 -right-10 w-[16vw] z-0 md:w-[14vw] lg:right-32 animate-spin-slow-20"/>
      </transition>
      <FleurBleu
      alt="FleurBleu"
          class="absolute bottom-[15rem] -left-10 w-[18vw] z-0 md:w-[16vw] md:bottom-[10rem] md:-left-20 lg:right-32 animate-spin-reverse-slow"/>


  </div>

    <!-- Texte au-dessus -->
    <div v-if="!formSubmitted">
      <h1 class="text-5xl text-black font-lactos text-center md:text-[7rem] lg:text-[10rem] pt-8 md:pt-12 lg:pt-16 z-10 relative pb-8 lg:pb-20">
        START A<br>PROJECT
      </h1>
    </div>
    <div v-else class="text-center">
      <h1 class="text-5xl text-black font-lactos md:text-[7rem] lg:text-[10rem] pt-8 md:pt-12 lg:pt-16 z-10 relative pb-8 lg:pb-4">
        THANK YOU
      </h1>
      <div class="bg-black mx-4 lg:w-8/12 lg:m-auto flex flex-col items-center rounded-3xl lg:py-20 font-unbounded p-8 z-10">
        <p class="text-base md:text-lg lg:text-xl text-colowhite pb-8 w-3/4">
          Your submission has been received !
        </p>
        <router-link
          to="/"
          class="flex items-center justify-center bg-colored text-white px-6 py-3 rounded-full text-xs md:text-sm lg:text-base hover:bg-coloblue transition-colors duration-500"
        >
          BACK TO HOME
          <img
            src="../assets/svg/ArrowWhite.svg"
            alt="Arrow"
            class="ml-2 w-5 md:w-6 lg:w-7"
          />
        </router-link>
      </div>
    </div>

    <section v-if="!formSubmitted" class="bg-black mx-4 lg:w-8/12 lg:m-auto flex justify-center items-center rounded-3xl lg:py-20 z-10">
      <div class="p-8 bg-black max-w-4xl md:w-4/5 text-white rounded-3xl shadow-lg font-unbounded z-10">
        <form @submit.prevent="submitForm" class="space-y-6 md:space-y-10 lg:space-y-14 z-10">
          <!-- Question 1: WHAT DO YOU NEED -->
          <div>
            <h2 class="text-sm md:text-base lg:text-lg mb-4 flex items-center">
              WHAT DO YOU NEED?
              <span v-if="errors.whatDoYouNeed" class="text-red-500 ml-2">&#9888;</span>
            </h2>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="option in whatDoYouNeedOptions"
                :key="option"
                @click="toggleSelection('whatDoYouNeed', option)"
                :class="[
                  'border border-white p-1.5 px-4 text-center rounded-full cursor-pointer text-xs md:text-sm lg:text-base flex-shrink-0 transition-colors duration-500',
                  selected.whatDoYouNeed.includes(option) ? 'bg-colored text-white' : 'hover:text-colored'
                ]"
              >
                {{ option }}
              </div>
            </div>
          </div>

          <!-- Question 2: WHERE DID YOU HEAR ABOUT ME? -->
          <div>
            <h2 class="text-sm md:text-base lg:text-lg mb-4 flex items-center">
              WHERE DID YOU HEAR ABOUT ME?
              <span v-if="errors.whereDidYouHear" class="text-red-500 ml-2">&#9888;</span>
            </h2>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="option in whereDidYouHearOptions"
                :key="option"
                @click="toggleSelection('whereDidYouHear', option)"
                :class="[
                  'border border-white p-1.5 px-4 text-center rounded-full cursor-pointer text-xs md:text-sm lg:text-base flex-shrink-0 transition-colors duration-500',
                  selected.whereDidYouHear.includes(option) ? 'bg-colored text-white' : 'hover:text-colored'
                ]"
              >
                {{ option }}
              </div>

            </div>
          </div>

          <!-- Question 3: DEADLINE TARGET -->
          <div>
            <h2 class="text-sm md:text-base lg:text-lg mb-4 flex items-center">
              DEADLINE TARGET
              <span v-if="errors.deadline" class="text-red-500 ml-2">&#9888;</span>
            </h2>
            <input
              v-model="formData.deadline"
              type="date"
              class="w-full bg-white p-4 text-black focus:outline-none focus:ring-2 focus:ring-gray-700 text-xs md:text-sm lg:text-base error:border-red-500"
            />
          </div>

          <!-- Question 4: DO YOU HAVE A BUDGET RANGE IN MIND? -->
          <div>
            <h2 class="text-sm md:text-base lg:text-lg mb-4 flex items-center">
              DO YOU HAVE A BUDGET RANGE IN MIND ?
              <span v-if="errors.budget" class="text-red-500 ml-2">&#9888;</span>
            </h2>
            <input
              v-model="formData.budget"
              type="text"
              placeholder="ENTER YOUR BUDGET RANGE"
              class="w-full bg-white p-4 text-black focus:outline-none focus:ring-2 focus:ring-gray-700 text-xs md:text-sm lg:text-base"
            />
          </div>

          <!-- Question 5: YOUR DETAILS -->
          <div>
            <h2 class="text-sm md:text-base lg:text-lg mb-4 flex items-center">
              YOUR DETAILS
              <span v-if="errors.name || errors.company || errors.enquiryType || errors.message" class="text-red-500 ml-2">&#9888;</span>
            </h2>
            <div class="space-y-4 text-xs md:text-sm lg:text-base">
              <input
                v-model="formData.name"
                type="text"
                placeholder="NAME"
                class="w-full bg-white p-4 text-black focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
              <input
                v-model="formData.company"
                type="text"
                placeholder="COMPANY"
                class="w-full bg-white p-4 text-black focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
              <input
                v-model="formData.enquiryType"
                type="text"
                placeholder="ENQUIRY TYPE"
                class="w-full bg-white p-4 text-black focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
              <textarea
                v-model="formData.message"
                placeholder="MESSAGE"
                rows="6"
                class="w-full bg-white p-4 text-black focus:outline-none focus:ring-2 focus:ring-gray-700"
              ></textarea>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-8">
            <button
              type="submit"
              class="flex items-center bg-colored text-white p-2 px-4 rounded-full hover:bg-coloblue text-xs md:text-sm lg:text-base transition-colors duration-500"
            >
              SEND
              <IconWhite alt="Arrow"
                class="ml-2 w-5 md:w-6 lg:w-7"
                />

            </button>
          </div>
        </form>
      </div>
    </section>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
