 <template>
  <div class="card">
    <header class="card-header is-centered">
      <a
        type="text"
        class="link"
        name="link"
        :href="donate_url + link.link_token"
        target="_blank"
      >{{ donate_url + link.link_token }}</a>
    </header>
    <div class="card-body">
      <div v-if="link.link_content && !editing" class="card-header-title is-centered">
        <linkpreview :url="link.link_content" />
        <a class="linky" v-on:click="editing=true">
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        </a>
      </div>
      <div v-else class="card-header-title">
        <div class="field has-addons">
          <div class="control has-icons-left">
            <input
              class="input is-rounded is-small"
              type="text"
              name="title"
              placeholder="Link to Content"
              ref="linkContent"
              v-model="link.link_content"
            />
            <span class="icon is-small is-left">
              <i class="fa fa-link"></i>
            </span>
          </div>
          <div class="control">
            <button
              class="button is-primary is-strong has-text-white is-rounded is-small"
              v-on:click="addLinkContent"
            >Add</button>
          </div>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-header-title">Donations raised: ${{ balance }}</p>
    </footer>
  </div>
</template>

<style scoped>
a {
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 1vh;
}
</style>

<script>
import axios from 'axios'
import router from '../router'
import linkpreview from './LinkPreview'
export default {
  name: 'Link',
  components: {
    linkpreview
  },
  props: {
    iLink: {
      link_token: '',
      link_content: '',
      donations: []
    }
  },
  data () {
    return {
      donate_url: `http://${location.host}/donate/`,
      link: this.iLink,
      balance: '',
      editing: false
    }
  },
  methods: {
    addLinkContent: function () {
      let self = this
      let data = {
        link_content: self.link.link_content
      }
      axios.post('/api/link/addcontent/' + self.link.link_token, data)
        .then(response => {
          self.$set(this, 'link', response.data.link)
          self.editing = false
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data.message)
            if (err.response.status === 401) {
              router.push('/')
            }
          }
        })
    },
    calculateBalance: function () {
      let balance = 0
      for (let donation of this.link.donations) {
        balance += parseInt(donation.amount)
      }
      return balance
    }
  },
  mounted () {
    this.balance = this.calculateBalance()
    if (!this.link.link_content) this.editing = true
  }
}
</script>
