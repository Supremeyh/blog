
### 选中某一项
```
<div v-for= "(item, index) in List">
  <p @click="currentCheckd=index" :class="{'current': currentCheckd===index}"></p>
</div>

```


