<template>
    <b-container fluid class="footer">
        <b-row class="bg-dark text-light py-4">
            <b-col lg="12" xl="8" offset-xl="2">
                <b-row>
                    <b-col lg="4">
                        <b-list-group flush>
                            <b-list-group-item to="/create-token/" class="text-light">
                                Create your Token
                            </b-list-group-item>
                            <b-list-group-item to="/docs/" class="text-light">
                                Documentation
                            </b-list-group-item>
                        </b-list-group>
                    </b-col>
                    <b-col lg="4">
                        <b-list-group flush>
                            <b-list-group-item to="/" class="text-light">ERC20 Token Generator</b-list-group-item>
                            <b-list-group-item v-b-modal.modal-feedback class="text-warning">
                                Leave a Feedback
                            </b-list-group-item>
                        </b-list-group>
                    </b-col>
                    <b-col lg="4">
                        <b-list-group flush>
                            <b-list-group-item v-b-modal.modal-privacy>
                                <small>Privacy Policy</small>
                            </b-list-group-item>
                            <b-list-group-item v-b-modal.modal-terms>
                                <small>Terms and Conditions</small>
                            </b-list-group-item>
                            <b-list-group-item v-b-modal.modal-disclaimer>
                                <small>Disclaimer</small>
                            </b-list-group-item>
                        </b-list-group>
                    </b-col>
                </b-row>
            </b-col>
            <b-col lg="12" xl="8" offset-xl="2">
                <hr>
                <b-list-group flush>
                    <b-list-group-item>
                        <small>
                            created by
                            <b-link class="text-warning" href="https://vittominacori.github.io/" target="_blank">
                                vittominacori
                            </b-link>
                        </small>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
        <b-modal id="modal-feedback"
                 title="Leave a Feedback"
                 size="lg"
                 centered
                 hide-footer>
            <b-embed
                    type="iframe"
                    aspect="4by3"
                    src="https://docs.google.com/forms/d/e/1FAIpQLSe62q73MmB4_irkkI-HF9QWUpdIVDk8c7zF9UMy16g6n-KQbA/viewform?embedded=true"
                    allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                    allowfullscreen
            ></b-embed>
        </b-modal>
        <b-modal id="modal-privacy"
                 title="Privacy Policy"
                 size="lg"
                 centered
                 hide-footer>
            <b-embed
                    type="iframe"
                    aspect="4by3"
                    src="/privacy/"
                    allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                    allowfullscreen
            ></b-embed>
        </b-modal>
        <b-modal id="modal-terms"
                 title="Terms and Conditions"
                 size="lg"
                 centered
                 hide-footer>
            <b-embed
                    type="iframe"
                    aspect="4by3"
                    src="/terms/"
                    allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                    allowfullscreen
            ></b-embed>
        </b-modal>
        <b-modal id="modal-disclaimer"
                 title="Disclaimer"
                 size="lg"
                 centered
                 hide-footer>
            <b-alert show variant="warning">
                <h4 class="alert-heading">DISCLAIMER</h4>
                <p>
                    ERC20 Token Generator and its author are free of any liability regarding Tokens built using this
                    software and the use that is made of them. Tokens built on ERC20 Token Generator, their
                    projects, their teams, their use of Token (as well as anything related to Token) are in no way
                    connected to ERC20 Token Generator or its author.
                </p>
                <hr>
                <small>
                    ERC20 Token Generator's code is provided under MIT License. Anyone can use it as per their
                    needs. The generator's purpose is to make people able to tokenize their ideas without coding or
                    paying large amounts for it. Source code is well tested and continuously updated to reduce risk
                    of bugs and introduce language optimizations. Anyway the purchase of tokens involves a high
                    degree of risk. Before acquiring tokens, it is recommended to carefully weighs all the
                    information and risks detailed in Token owner's Conditions.
                </small>
            </b-alert>
        </b-modal>
    </b-container>
</template>

<script>
  export default {
    name: 'Footer',
  };
</script>
