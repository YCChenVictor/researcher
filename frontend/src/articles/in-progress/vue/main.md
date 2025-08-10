# Title

## Purpose

## Concept

### init

install

```bash
yarn global add -g @vue/cli
```

create project

```bash
vue create project-name
```

### basic structure

When to extract a component? When you believe this component can be used in another scenario.

### index

create `components/AppIndex.vue`

```vue
<template>
  <div>
    <Modal
      :modalOpen="modalOpen"
      :modalOptions="modalOptions"
      @refreshRecords="refreshRecords"
      @closeModal="closeModal"
    />
    <div class="" @click="openModal">
      <span>create record</span>
    </div>
    <Records
      :records="records"
      @editRecord="editRecord"
      @deleteRecord="deleteRecord"
    />
  </div>
</template>

<script>
import Modal from './components/Modal.vue'
import Records from './components/Records.vue'

export default {
  name: 'AppIndex',
  components: {
    Modal,
    Records
  }
}
</script>
```

and in `App.vue` import and render it

```vue
<template>
  <AppIndex />
</template>

<script>
import AppIndex from './components/AppIndex.vue'

export default {
  name: 'App',
  components: {
    AppIndex
  }
}
</script>

<style>
</style>
```

### modal

With single selection, upload data.

Create `./components/Modal.vue`

```vue
<template>
  <div class="">
    <f-modal
      v-if="modalOpen"
    >
      <template #close-button>
        <span
          class="close"
          href="javascript:void(0)"
          @click="closeModal"
        >
          &times;
        </span>
      </template>
      <template
        #header
      >
        {{ 'practice' }}
      </template>
      <template #body>
        <div
          v-if="false"
          class=""
        >
          <div
            class=""
            data-dismiss="alert"
          >
            ×
          </div>
          <h4>{{ 'title' }}</h4>
          <ul>
            <li v-bind="error">
              {{ error }}
            </li>
          </ul>
        </div>
        <b-row>
          <b-col md="4">
            <div
              class=""
            >
              <div class="">
                <label class="">{{ 'file' }}</label>
              </div>
              <input type="file" id="file" @change="handleFileUpload" ref="file">
            </div>
          </b-col>
        </b-row>
      </template>
      <template #footer>
        <b-button
          class=""
          :disabled="submitting"
          @click="submit"
        >
          {{ 'submit' }}
        </b-button>
      </template>
    </f-modal>
  </div>
</template>

<script>
</script>

<style>
</style>
```

### condition

```vue
<template>
  <div>
    <p v-if="showMessage">Hello, World!</p>
    <p v-else>Goodbye, World!</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showMessage: false
      }
    }
  }
</script>
```

### list

### CRUD

create

```javascript
```

## other

### index.html

1. create a basic template
2. import vue with CDN
3. create Vue app and add mount
4. add v-model to dynamically change the text
5. add v-if for box showing (if `isVisible: true`, then the div with `v-if = isVisible` will appear)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Vue 3 Basic</title>
    <style>
        .box {
            background-color: purple;
            height: 200px;
            width: 200px;
        }
    </style>
</head>
<body>
    <div id="app">
        {{ greeting }}
        <input v-model = "greeting" />

        <div v-if="isVisible" class="box"></div>
    </div>

    <script src="https://unpkg.com/vue@next"></script>
    <script>
        let app = Vue.createApp({
            data: function() {
                return {
                    greeting: "Hello World",
                    isVisible: true
                }
            }
        })
        app.mount('#app')
    </script>
</body>
</html>
```

### v-show

Given above template, we can use `<div v-show='isVisible' class=box></div>` instead of `<div v-if="isVisible" class="box"></div>`, then in the inspection of your browser, it use style to determine whether to show it or not.

### v-if v-else-if v-else

For some logics in rendering, use following `<div>`

```
...
<div v-if="isVisible" class="box"></div>
<div v-else-if="isVisible2" class="box two"></div>
<div v-else class="box three"></div>
...
```

and of course, styles:

```
...
.box {
    background-color: purple;
    height: 200px;
    width: 200px;
}
.box.two {
    background-color: red;
}
.box.three {
    background-color: blue;
}
...
```

With the components above, refreshing the page makes all the boxes appear at first, meaning Vue is not ready at first. To avoid it, add `v-clock` to `<div id="app">`.

### v-clock

`v-clock` avoids components being rendered before Vue being loaded with following settings

```
<div id="app" v-clock>
```

and

```
<style>
    [v-cloak] {
        display: none;
    }
</style>
```

### property

#### watch

In Vue.js, the watch property is used to set up a reactive observer on a specific component property. It allows you to perform some actions in response to changes in a specific property, by specifying a callback function that will be executed whenever the property changes. The watch property is a convenient way to react to data changes in your component and carry out some logic in response to those changes.

## What?

Then we have the full example as follow:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Vue 3 Basic</title>
    <style>
        .box {
            background-color: purple;
            height: 200px;
            width: 200px;
        }
        .box.two {
            background-color: red;
        }
        .box.three {
            background-color: blue;
        }
        [v-cloak] {
            display: none;
        }
    </style>
</head>
<body>
    <div id="app" v-cloak>
        {{ greeting }}
        <input v-model = "greeting" />

        <div v-if="isVisible" class="box"></div>
        <div v-else-if="isVisible2" class="box two"></div>
        <div v-else class="box three"></div>
    </div>

    <script src="https://unpkg.com/vue@next"></script>
    <script>
        let app = Vue.createApp({
            data: function() {
                return {
                    greeting: "Hello World",
                    isVisible: false
                }
            }
        })
        app.mount('#app')
    </script>
</body>
</html>
```

### life cycle

* Creation
  * setup: This is where reactive state, computed properties, and methods are defined using the Composition API. It replaces the beforeCreate and created hooks in Vue 2 for components created using the Composition API. For components created using the Options API, beforeCreate and created hooks remain.
* Mounting
  * onBeforeMount: Called before the component's template is compiled, and the resulting DOM is about to be mounted/rendered.
  * onMounted: Called after the component's template is compiled, and the DOM is mounted into the page.
* Updating
  * onBeforeUpdate: Called just before the DOM is patched to reflect reactive data changes.
  * onUpdated: Called after the component's reactive data has been updated and the DOM has been re-rendered.
* Destruction
  * onBeforeUnmount: Called just before the component is about to be unmounted. The component is still fully functional at this point.
  * onUnmounted: Called after the component is unmounted. All event listeners and child components have been removed.
* Error Handling
  * onErrorCaptured: Available for handling errors occurring during the component's lifecycle. Captures errors from the component and its children.
* Deactivated and Activated
  * These hooks are primarily related to Vue's keep-alive feature, and their names remain the same as in Vue 2 (deactivated, activated). They are not part of the Composition API but are still available for components using the Options API.

## Example

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue 3 Lifecycle Hooks Example</title>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="app">
    <h1>{{ message }}</h1>
    <button @click="updateMessage">Update Message</button>
  </div>

  <script>
    const { reactive, onMounted, onUnmounted } = Vue;

    const app = Vue.createApp({
      setup() {
        // Define reactive state
        const state = reactive({
          message: 'Initial message'
        });

        // Lifecycle hook: onMounted
        onMounted(() => {
          console.log('Component is mounted');
        });

        // Lifecycle hook: onUnmounted
        onUnmounted(() => {
          console.log('Component is unmounted');
        });

        // Method to update the message
        const updateMessage = () => {
          state.message = 'Updated message';
        };

        // Return reactive state and methods
        return {
          message: state.message,
          updateMessage
        };
      }
    });

    app.mount('#app');
  </script>
</body>
</html>
```

* We're importing the Vue 3 library from a CDN.
* We define a Vue 3 app using Vue.createApp.
* Inside the setup function, we use the Composition API to define reactive state (message) and methods (updateMessage).
* We use onMounted to execute a function when the component is mounted, and onUnmounted to execute a function when the component is about to be unmounted.
* The template displays the message state and provides a button to update it.
* When the button is clicked, the updateMessage method is called, updating the message state.
* Console logs are added inside the lifecycle hooks to demonstrate their execution.

## Reference

[Vue.js Course for Beginners [2021 Tutorial]](https://www.youtube.com/watch?v=FXpIoQ_rT_c&t=0s)
