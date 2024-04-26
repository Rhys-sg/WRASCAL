<template>
    <div class="input-container">
        <div class="icon-wrapper">
          <span class="mdi mdi-gold prepend-icon"></span>
        </div>
        <div contenteditable="true" v-html="input" class="text-box" ref="myTextBox" @input="updateText" @click="removePlaceholder" @blur="addPlaceholder" @keydown="updateText" @keyup="updateText" @mouseup="updateText"></div>
        <div class="button-container">
        <button :class="{ 'highlighted': activeButton === 'normal_button' }" @click="surroundTextWithTag('normal_button')">X</button>
        <button :class="{ 'highlighted': activeButton === 'sup_button' }" @click="surroundTextWithTag('sup_button')">X<sup>y</sup></button>
        <button :class="{ 'highlighted': activeButton === 'sub_button' }" @click="surroundTextWithTag('sub_button')">X<sub>y</sub></button>
        <!-- <button :class="{ 'highlighted': activeButton === 'stack_button' }" @click="surroundTextWithboth()">X<span class="buttonstacked"><sup>z</sup><sub>y</sub></span></button> -->
        <button :class="{ 'highlighted': activeButton === 'compute_button' }" @click="this.input =compute(this.displayText)">Compute</button>
      </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

import {
  surroundTextWithTag,
  surroundTextWithboth,
  insertOperator,
  compute,
  computeTestCases,
  getSelectedText,
  updateCaretPosition,
  removeAdjacent,
  normalizeOperators,
  removeTemplateLiterals,
  updateText,
  removePlaceholder,
  addPlaceholder
} from './ChemInputMethods.js';

export default defineComponent({
  props: {
    name: {
      type: String,
    }
  },
  data() {
    return {
      input: this.name,
      activeButton: 'normal_button',
      displayText: '',
      computedText: '',
      operators: new Set(['⇒', '⇄']),
      caretPosition: 0,
      tags: new Map([
        ['sup_button', ['<sup>', '</sup>']],
        ['sub_button', ['<sub>', '</sub>']],
        ['normal_button', ['', '']]
      ]),
      elements: new Set([
        "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K",
        "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb",
        "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs",
        "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta",
        "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa",
        "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt"
    ])  
    };
  },
  methods: {
    surroundTextWithTag,
    surroundTextWithboth,
    insertOperator,
    compute,
    computeTestCases,
    getSelectedText,
    updateCaretPosition,
    removeAdjacent,
    normalizeOperators,
    removeTemplateLiterals,
    updateText,
    removePlaceholder,
    addPlaceholder,
  }
});
</script>

<style scoped>
.icon-wrapper {
  margin-right: 16px;
  margin-top: 8px;
}

.prepend-icon {
  font-size: 24px;
  color: var(--v-theme-on-background);
  opacity: var(--v-medium-emphasis-opacity);
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-box {
    width: 300px;
    height: 56px;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 16px;
    outline: none;
    color: var(--v-theme-on-background);
    opacity: var(--v-medium-emphasis-opacity);
    background-color: rgb(40, 40, 40);
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2), 0 1.5px 1.5px rgba(0, 0, 0, 0.4);
    line-height: 36px;
}

.v-theme--dark .text-box {
  background-color: rgb(40, 40, 40);
  color: white;
}

.v-theme--light .text-box {
  background-color: white;
  color: black;
}

.input-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.button-container button {
  margin: 10px 0px 0 10px;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-container button.highlighted {
  background-color: #0056b3;
}

.stacked,
.buttonstacked {
  position: relative;
  display: inline-block;
}

.stacked sup,
.stacked sub,
.buttonstacked sup,
.buttonstacked sub {
  position: absolute;
  left: 0;
  display: block;
  text-align: center;
}

/* two different stacked ratios because the button looks weird if it's accurate */
.buttonstacked sup {
  top: -1.2em;
}

.buttonstacked sub {
  bottom: 0em;
}

.stacked sup {
  top: -1.3em;
}

.stacked sub {
  bottom: -1.25em;
}

</style>