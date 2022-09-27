import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'calc-container',
  styleUrl: 'calc-container.scss',
})
export class CalcContainer {
  @State() input: string = '';
  @State() result: number;

  // gettingResultHandler() {
  //   //   this.result = eval(this.input);
  //   function parse(str: string) {
  //     return Function(`'use strict'; return (${str})`)();
  //   }
  //   const finder: any = () => {
  //     if (this.input.includes('%')) {
  //       const indexOfPercent = this.input.indexOf('%');
  //       const numRegEx = /[0-9]/g;
  //       let numArr: string[] = [];
  //       let whatReplace: string;
  //       let toReplce: string;
  //       for (let i = indexOfPercent - 1; this.input.charAt(i).match(numRegEx); i--) {
  //         numArr.push(this.input.charAt(i));
  //         whatReplace = numArr.reverse().join('');
  //         toReplce = (Number(whatReplace) / 100).toString();
  //       }
  //       this.input = this.input.replace(whatReplace + '%', toReplce);
  //       this.result = parse(this.input);
  //     } else {
  //       this.result = parse(this.input);
  //     }
  //   };
  //   // arr.forEach(finder());
  //   for (let i = 0; i <= 10; i++) {
  //     finder();
  //   }
  //   // if (this.input.includes('%')) {
  //   //   const indexOfPercent = this.input.indexOf('%');
  //   //   const numRegEx = /[0-9]/g;
  //   //   let numArr: string[] = [];
  //   //   let whatReplace: string;
  //   //   let toReplce: string;
  //   //   for (let i = indexOfPercent - 1; this.input.charAt(i).match(numRegEx); i--) {
  //   //     numArr.push(this.input.charAt(i));
  //   //     whatReplace = numArr.reverse().join('');
  //   //     toReplce = (Number(whatReplace) / 100).toString();
  //   //   }
  //   //   this.input = this.input.replace(whatReplace + '%', toReplce);

  //   //   this.result = parse(this.input);
  //   // } else {
  //   //   console.log(this.input);
  //   //   this.result = parse(this.input);
  //   // }
  // }
  gettingResultHandler() {
    let inputCopy = this.input;
    function parse(str: string) {
      return Function(`'use strict'; return (${str})`)();
    }
    if (inputCopy.includes('%')) {
      for (let i = 0; i <= inputCopy.length; i++) {
        inputCopy = inputCopy.replace('%', '/100');
        // console.log(inputCopy);
      }
      this.result = parse(inputCopy);
    } else {
      this.result = parse(this.input);
    }
  }

  onInputHandler(e: Event) {
    const eTarget = e.target as HTMLInputElement;
    const rexExp = /[a-zA-Z]+/g;
    if (!this.input.match(rexExp)) {
      this.input = eTarget.value;
    }
  }
  onKeyPressHandler(e: KeyboardEvent) {
    //  const rexExp = /[a-zA-Z ]/g;
    //  const regExpBackSpace = /[b]/g;
    if (e.key === 'Enter') {
      this.gettingResultHandler();
    }
    if (e.key !== 'Backspace') {
      if (e.key !== 'ArrowRight') {
        if (e.key !== 'ArrowLeft') {
          const regExNums = /[0-9^*()%.+-/]/g;

          if (!e.key.match(regExNums)) {
            e.preventDefault();
            console.log(e.key);
          }
        }
      }
    }
  }
  factorialHandler() {
    const factNum = Number(this.input);
    function factorial(n: number) {
      return n ? n * factorial(n - 1) : 1;
    }
    const factResult = factorial(factNum);
    this.result = factResult;
  }
  lgHandler() {
    this.result = Math.log10(Number(this.input));
  }
  powerToHandler() {
    this.result = Number(this.input) ** 2;
  }
  squareRootHandler() {
    this.result = Math.sqrt(Number(this.input));
  }
  tenPowerToHandler() {
    this.result = 10 ** Number(this.input);
  }
  percentHandler() {
    this.input = this.input + '%';
  }
  render() {
    return (
      <div class={'container'}>
        <div class={'input-area'}>
          <input type="text" onKeyDown={e => this.onKeyPressHandler(e)} onInput={e => this.onInputHandler(e)} value={this.input} />
          <p>{this.result ? this.result : '0'}</p>
        </div>
        <div class={'grid-container'}>
          <button class={'btn'} onClick={this.percentHandler.bind(this)}>
            %
          </button>
          <button class={'btn'} onClick={() => (this.input = '')}>
            CE
          </button>
          <button class={'btn'} onClick={() => (this.input = '')}>
            C
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input.slice(0, -1))}>
            {'<--'}
          </button>
          <button class={'btn'} onClick={this.tenPowerToHandler.bind(this)}>
            10^x
          </button>
          <button class={'btn'} onClick={this.powerToHandler.bind(this)}>
            x^2
          </button>
          <button class={'btn'} onClick={this.squareRootHandler.bind(this)}>
            sqrt
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + '/')}>
            /
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + '(')}>
            {'('}
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + ')')}>
            {')'}
          </button>
          <button class={'btn'} onClick={this.lgHandler.bind(this)}>
            log
          </button>
          <button class={'btn'} onClick={this.factorialHandler.bind(this)}>
            n!
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + 7)}>
            7
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + 8)}>
            8
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + 9)}>
            9
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + '*')}>
            X
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + 4)}>
            4
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + 5)}>
            5
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + 6)}>
            6
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + '-')}>
            -
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + 1)}>
            1
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + 2)}>
            2
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + 3)}>
            3
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + '+')}>
            +
          </button>
          <button class={'btn'}>+/-</button>
          <button class={'btn'} onClick={() => (this.input = this.input + 0)}>
            0
          </button>
          <button class={'btn'} onClick={() => (this.input = this.input + '.')}>
            .
          </button>
          <button
            class={'btn'}
            onClick={() => this.gettingResultHandler()}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                this.gettingResultHandler();
              }
            }}
          >
            =
          </button>
        </div>
      </div>
    );
  }
}
